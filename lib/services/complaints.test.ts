import { createComplaint, getComplaint } from './complaints'

describe('complaints service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.cookie = 'csrftoken=test-token'
  })

  describe('createComplaint', () => {
    it('sends form data with required fields', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(
          JSON.stringify({ success: true, tracking_id: 'FC-00001' }),
          { status: 201 },
        ),
      )

      const result = await createComplaint({
        category: 'Road Damage/Potholes',
        area: 'Ezhara Central',
        description: 'Large pothole near market junction causing traffic issues.',
      })

      expect(result.tracking_id).toBe('FC-00001')

      const [, init] = vi.mocked(global.fetch).mock.calls[0]
      expect(init?.method).toBe('POST')
      expect(init?.credentials).toBe('include')
    })

    it('includes photo in form data', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ success: true, tracking_id: 'FC-00002' }), { status: 201 }),
      )

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      await createComplaint({
        category: 'Broken Street Lights',
        area: 'Ezhara East',
        description: 'Street light not working.',
        photo: file,
        reporter_name: 'John',
      })

      const formData = vi.mocked(global.fetch).mock.calls[0][1]?.body as FormData
      expect(formData?.get('photo')).toBe(file)
      expect(formData?.get('reporter_name')).toBe('John')
    })

    it('throws error on failed submission', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ message: 'Failed to submit complaint.' }), { status: 400 }),
      )

      await expect(
        createComplaint({
          category: 'Road Damage/Potholes',
          area: 'Ezhara Central',
          description: 'Test description.',
        }),
      ).rejects.toThrow('Failed to submit complaint.')
    })
  })

  describe('getComplaint', () => {
    it('fetches complaint by tracking id', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(
          JSON.stringify({
            id: 1,
            tracking_id: 'FC-00001',
            category: 'Road Damage/Potholes',
            area: 'Ezhara Central',
            description: 'Test description.',
            status: 'pending',
            photo: null,
            photo_url: null,
            reporter_name: null,
            reporter_phone: null,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          }),
          { status: 200 },
        ),
      )

      const result = await getComplaint('FC-00001')

      expect(result.tracking_id).toBe('FC-00001')
      expect(result.status).toBe('pending')
    })

    it('throws error for nonexistent complaint', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue(
        new Response(JSON.stringify({ message: 'Complaint not found' }), { status: 404 }),
      )

      await expect(getComplaint('FC-99999')).rejects.toThrow('Complaint not found')
    })
  })
})