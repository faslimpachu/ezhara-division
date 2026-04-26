'use client'

import { useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

export function LoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    setShowLoginModal(false)
    router.push('/auth/login')
  }

  const handleClose = () => {
    setShowLoginModal(false)
  }

  return (
    <Dialog open={showLoginModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <DialogTitle className="text-center">Authentication Required</DialogTitle>
          <DialogDescription className="text-center">
            You need to be logged in to access this feature. Please sign in to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleLogin} className="sm:ml-2">
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}