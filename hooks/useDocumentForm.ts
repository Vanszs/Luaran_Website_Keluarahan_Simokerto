import { useState, useEffect, useCallback } from 'react';
import { DocumentTemplate, DocumentField } from '../utils/documentTemplates';

interface FormErrors {
  [key: string]: string;
}

interface UseDocumentFormReturn {
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
  isSubmitting: boolean;
  isDraft: boolean;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  validateField: (name: string, value: any, field: DocumentField) => string;
  validateForm: () => boolean;
  saveDraft: () => void;
  loadDraft: () => void;
  submitForm: () => Promise<{ success: boolean; documentId?: string; error?: string }>;
  resetForm: () => void;
  updateField: (name: string, value: any) => void;
  getFieldError: (name: string) => string;
  hasErrors: boolean;
  isFormValid: boolean;
}

export const useDocumentForm = (template: DocumentTemplate): UseDocumentFormReturn => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const draftKey = `draft_${template.id}`;

  // Initialize form with default values
  useEffect(() => {
    const initialData: Record<string, any> = {};
    template.fields.forEach(field => {
      if (field.type === 'number') {
        initialData[field.name] = field.min || 0;
      } else {
        initialData[field.name] = '';
      }
    });
    setFormData(initialData);
  }, [template]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  const validateField = useCallback((name: string, value: any, field: DocumentField): string => {
    let error = '';

    if (field.required && (!value || value.toString().trim() === '')) {
      error = `${field.label} wajib diisi`;
    } else if (value && value.toString().trim() !== '') {
      // Pattern validation
      if (field.pattern && !new RegExp(field.pattern).test(value)) {
        if (field.name === 'nik') {
          error = 'NIK harus 16 digit angka';
        } else {
          error = `Format ${field.label} tidak valid`;
        }
      }
      
      // Email validation
      if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Format email tidak valid';
      }
      
      // Number validations
      if (field.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          error = `${field.label} harus berupa angka`;
        } else {
          if (field.min !== undefined && numValue < field.min) {
            error = `${field.label} minimal ${field.min}`;
          }
          if (field.max !== undefined && numValue > field.max) {
            error = `${field.label} maksimal ${field.max}`;
          }
        }
      }

      // Text length validations
      if (field.type === 'text' || field.type === 'textarea') {
        if (value.length < 2) {
          error = `${field.label} minimal 2 karakter`;
        }
        if (value.length > 500) {
          error = `${field.label} maksimal 500 karakter`;
        }
      }
    }

    return error;
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    template.fields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, template.fields, validateField]);

  const updateField = useCallback((name: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Clear error for this field when user starts typing
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });

      return updated;
    });
  }, []);

  const saveDraft = useCallback(() => {
    try {
      const draftData = {
        ...formData,
        timestamp: new Date().toISOString(),
        templateId: template.id
      };
      localStorage.setItem(draftKey, JSON.stringify(draftData));
      setIsDraft(true);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, [formData, draftKey, template.id]);

  const loadDraft = useCallback(() => {
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const draftData = JSON.parse(draft);
        if (draftData.templateId === template.id) {
          const { timestamp, templateId, ...data } = draftData;
          setFormData(data);
          setIsDraft(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to load draft:', error);
      return false;
    }
  }, [draftKey, template.id]);

  const submitForm = useCallback(async (): Promise<{ success: boolean; documentId?: string; error?: string }> => {
    if (!validateForm()) {
      return { success: false, error: 'Harap perbaiki kesalahan pada formulir' };
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate document ID
      const documentId = `DOC${Date.now()}`;
      
      // Remove draft after successful submission
      localStorage.removeItem(draftKey);
      setIsDraft(false);
      
      setIsSubmitting(false);
      return { success: true, documentId };
    } catch (error) {
      setIsSubmitting(false);
      return { success: false, error: 'Terjadi kesalahan saat mengirim dokumen' };
    }
  }, [validateForm, draftKey]);

  const resetForm = useCallback(() => {
    const initialData: Record<string, any> = {};
    template.fields.forEach(field => {
      if (field.type === 'number') {
        initialData[field.name] = field.min || 0;
      } else {
        initialData[field.name] = '';
      }
    });
    setFormData(initialData);
    setErrors({});
    setCurrentStep(0);
    localStorage.removeItem(draftKey);
    setIsDraft(false);
  }, [template.fields, draftKey]);

  const getFieldError = useCallback((name: string): string => {
    return errors[name] || '';
  }, [errors]);

  const hasErrors = Object.keys(errors).length > 0;
  const isFormValid = template.fields.every(field => {
    if (field.required) {
      const value = formData[field.name];
      return value && value.toString().trim() !== '';
    }
    return true;
  }) && !hasErrors;

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    isDraft,
    currentStep,
    setCurrentStep,
    validateField,
    validateForm,
    saveDraft,
    loadDraft,
    submitForm,
    resetForm,
    updateField,
    getFieldError,
    hasErrors,
    isFormValid
  };
};
