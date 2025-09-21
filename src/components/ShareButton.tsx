import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Link2,
  QrCode,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  url?: string;
  title: string;
  description?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title,
  description,
  variant = 'ghost',
  size = 'md',
  showLabel = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  const shareText = description ? `${title} - ${description}` : title;

  const handleShare = async (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'native':
        // Use native share API if available
        if (navigator.share) {
          try {
            await navigator.share({
              title,
              text: description,
              url: shareUrl
            });
            toast.success('Shared successfully!');
          } catch (error) {
            // User cancelled or error occurred
            console.log('Share cancelled or failed:', error);
          }
        } else {
          toast.error('Share not supported on this device');
        }
        break;
        
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
        break;
        
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
        window.open(shareLink, '_blank');
        toast.success('Opening WhatsApp...');
        break;
        
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(shareLink, '_blank', 'width=600,height=400');
        toast.success('Opening Facebook...');
        break;
        
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(shareLink, '_blank', 'width=600,height=400');
        toast.success('Opening Twitter...');
        break;
        
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(shareLink, '_blank', 'width=600,height=400');
        toast.success('Opening LinkedIn...');
        break;
        
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(shareLink, '_blank');
        toast.success('Opening Telegram...');
        break;
        
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || ''}\n\n${shareUrl}`)}`;
        window.location.href = shareLink;
        toast.success('Opening email client...');
        break;
        
      case 'qr':
        // Generate QR code (would need a QR library in production)
        toast.info('QR code generation coming soon!');
        break;
        
      default:
        break;
    }
    
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: 'h-8 px-2',
    md: 'h-9 px-3',
    lg: 'h-10 px-4'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={cn(sizeClasses[size], className)}
        >
          <Share2 className={cn(iconSizes[size], showLabel && 'mr-2')} />
          {showLabel && 'Share'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Share this {title ? 'event' : 'page'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Native Share (if available) */}
        {navigator.share && (
          <>
            <DropdownMenuItem onClick={() => handleShare('native')}>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share...</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        {/* Copy Link */}
        <DropdownMenuItem onClick={() => handleShare('copy')}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy link</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Social Platforms */}
        <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
          <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('facebook')}>
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          <span>Facebook</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          <Twitter className="mr-2 h-4 w-4 text-sky-500" />
          <span>Twitter</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('telegram')}>
          <Send className="mr-2 h-4 w-4 text-blue-500" />
          <span>Telegram</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Email */}
        <DropdownMenuItem onClick={() => handleShare('email')}>
          <Mail className="mr-2 h-4 w-4" />
          <span>Email</span>
        </DropdownMenuItem>
        
        {/* QR Code */}
        <DropdownMenuItem onClick={() => handleShare('qr')}>
          <QrCode className="mr-2 h-4 w-4" />
          <span>QR Code</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};