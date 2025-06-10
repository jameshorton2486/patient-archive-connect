
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, required, error, success, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="form-label flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
        {success && <CheckCircle className="h-4 w-4 text-green-600" />}
      </Label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="border-b border-border pb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string;
  className?: string;
}

export function FormCard({ 
  title, 
  description, 
  children, 
  onSubmit, 
  submitLabel = 'Submit',
  isSubmitting = false,
  error,
  className 
}: FormCardProps) {
  return (
    <Card className={cn('card-enhanced', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {children}
          {onSubmit && (
            <div className="flex justify-end gap-3 pt-6 border-t border-border">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="btn-primary min-w-[120px]">
                {isSubmitting ? 'Submitting...' : submitLabel}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

// Enhanced Input with built-in styling
export function EnhancedInput({ className, error, ...props }: React.ComponentProps<typeof Input> & { error?: boolean }) {
  return (
    <Input 
      className={cn(
        'form-input h-11',
        error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
        className
      )}
      {...props}
    />
  );
}

// Enhanced Textarea with built-in styling
export function EnhancedTextarea({ className, error, ...props }: React.ComponentProps<typeof Textarea> & { error?: boolean }) {
  return (
    <Textarea 
      className={cn(
        'form-input min-h-[100px]',
        error && 'border-destructive focus:border-destructive focus:ring-destructive/20',
        className
      )}
      {...props}
    />
  );
}

// Enhanced Select with built-in styling - Fixed TypeScript issue
interface EnhancedSelectProps extends React.ComponentProps<typeof Select> {
  children: React.ReactNode;
  className?: string;
}

export function EnhancedSelect({ className, children, ...props }: EnhancedSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className={cn('form-input h-11', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {children}
      </SelectContent>
    </Select>
  );
}
