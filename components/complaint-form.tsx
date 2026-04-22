'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  CheckCircle2,
  Copy,
  Loader2,
  Camera,
  X,
} from 'lucide-react'
import { createComplaint } from '@/lib/services/complaints'

const formSchema = z.object({
  category: z.string().min(1, 'Please select a category'),
  area: z.string().min(1, 'Please select an area'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  photo: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const areas = [
  'Ezhara Central',
  'Ezhara East',
  'Ezhara West',
  'Ezhara North',
  'Railway Station Area',
  'Market Area',
  'Residential Zone A',
  'Residential Zone B',
]

const categories = [
  'Road Damage/Potholes',
  'Broken Street Lights',
  'Water Supply Issues',
  'Waste Management',
  'Drainage Problems',
  'Public Property Damage',
  'Illegal Dumping',
  'Other',
]

export default function ComplaintForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      area: '',
      description: '',
      photo: '',
      name: '',
      phone: '',
    },
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPhotoPreview(result)
        form.setValue('photo', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      const { tracking_id } = await createComplaint({
        category: values.category,
        area: values.area,
        description: values.description,
        photo: values.photo ? dataURLtoFile(values.photo) : null,
        reporter_name: values.name || undefined,
        reporter_phone: values.phone || undefined,
      })
      setTrackingId(tracking_id)
    } catch (error) {
      console.error('Error submitting complaint:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  function dataURLtoFile(dataurl: string): File {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) u8arr[n] = bstr.charCodeAt(n)
    const blob = new Blob([u8arr], { type: mime })
    return new File([blob], 'photo.jpg', { type: mime })
  }

  const handleReset = () => {
    setTrackingId(null)
    setPhotoPreview('')
    form.reset()
  }

  const copyTrackingId = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId)
    }
  }

  if (trackingId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 sm:p-12 border border-border/50 bg-gradient-to-br from-green-50/50 to-background">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </motion.div>

            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Complaint Submitted!
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Thank you for reporting this issue. We will review and take action to improve Ezhara.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8 inline-block">
              <p className="text-sm text-muted-foreground mb-2">
                Your Tracking ID
              </p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-3xl font-bold text-primary font-mono">
                  {trackingId}
                </p>
                <button
                  onClick={copyTrackingId}
                  className="p-3 hover:bg-primary/10 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5 text-primary" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Save this ID to track your complaint status
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleReset}
                className="px-6"
              >
                File Another Complaint
              </Button>
              <Button className="bg-primary hover:bg-primary/90 px-6">
                Track Status
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      {/* Simple One-Page Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 sm:p-10 border border-border/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Category & Area - First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Issue Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Location / Area</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {areas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Describe the Issue</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe the issue in detail. Include specific information that will help us address it quickly..."
                        className="min-h-32 resize-none text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo Upload - Optional */}
              <FormField
                control={form.control}
                name="photo"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Evidence Photo (Optional)</FormLabel>
                    {photoPreview ? (
                      <div className="relative w-full">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview('')
                            form.setValue('photo', '')
                          }}
                          className="absolute top-2 right-2 bg-destructive text-white p-2 rounded-lg hover:bg-destructive/90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all block">
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-full w-fit">
                            <Camera className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              Upload photo
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Click to upload or drag and drop (Optional)
                            </p>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Info - Optional */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-4">Share Contact Info (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="h-11 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Your phone number"
                            className="h-11 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Complaint'
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  )
}
