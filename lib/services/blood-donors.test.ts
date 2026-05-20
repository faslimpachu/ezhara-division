import { createBloodDonor } from './blood-donors'

describe('blood-donors service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.cookie = 'csrftoken=test-token'
  })

  it('posts to /api/blood-donors/ with correct payload and credentials', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ success: true, donor_id: 'EZH-B-ABC123' }),
        { status: 201 },
      ),
    )

    const result = await createBloodDonor({
      age: 28,
      blood_group: 'O+',
      district: 'Ezhara',
      address: '123 Main Street',
    })

    expect(result.donor_id).toBe('EZH-B-ABC123')

    const [url, init] = vi.mocked(global.fetch).mock.calls[0]
    expect(url).toContain('/api/blood-donors/')
    expect(init?.method).toBe('POST')
    expect(init?.credentials).toBe('include')
    expect(init?.headers).toHaveProperty('Content-Type', 'application/json')
  })

  it('throws on failure response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ detail: 'Invalid data' }), { status: 400 }),
    )

    await expect(
      createBloodDonor({ age: 0, blood_group: '', district: '', address: '' })
    ).rejects.toThrow()
  })
})
