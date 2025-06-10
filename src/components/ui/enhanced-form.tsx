
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
  htmlFor?: string;
}

export function FormField({ label, required, error, success, children, className, htmlFor }: FormFieldProps) {
  const fieldId = htmlFor || React.useId();
  
  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={fieldId}
        className="text-sm font-medium text-primary-700 flex items-center gap-1"
      >
        {label}
        {required && (
          <span className="text-error-500" aria-label="required">*</span>
        )}
        {success && <CheckCircle className="h-4 w-4 text-success-600" aria-label="valid" />}
      </Label>
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': error ? `${fieldId}-error` : undefined,
          'aria-invalid': error ? 'true' : 'false',
          error: !!error
        })}
      </div>
      {error && (
        <div 
          id={`${fieldId}-error`}
          className="flex items-center gap-1 text-sm text-error-600"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
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
      <div className="border-b border-primary-200 pb-3">
        <h3 className="text-lg font-semibold text-primary-900">{title}</h3>
        {description && (
          <p className="text-sm text-primary-500 mt-1">{description}</p>
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
    <Card className={cn('bg-primary border-primary-200', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary-900">{title}</CardTitle>
        {description && <CardDescription className="text-primary-500">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          {error && (
            <Alert variant="destructive" role="alert">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {children}
          {onSubmit && (
            <div className="flex justify-end gap-3 pt-6 border-t border-primary-200">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button 
                type="submit" 
                loading={isSubmitting}
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {submitLabel}
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
      className={cn('h-11', className)}
      error={error}
      {...props}
    />
  );
}

// Enhanced Textarea with built-in styling
export function EnhancedTextarea({ className, error, ...props }: React.ComponentProps<typeof Textarea> & { error?: boolean }) {
  return (
    <Textarea 
      className={cn(
        'min-h-[100px] w-full px-3 py-2 bg-primary border border-primary-200 rounded-md text-sm',
        'focus:ring-2 focus:ring-accent-medical/20 focus:border-accent-medical',
        'transition-all duration-200 placeholder-primary-400',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  );
}
