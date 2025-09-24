import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  code: z.string().min(1, 'Code d\'accès requis').min(10, 'Code d\'accès trop court')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(data.code)) {
      navigate('/dashboard');
    } else {
      setError('code', {
        type: 'manual',
        message: 'Code d\'accès invalide. Veuillez réessayer.'
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img 
              src="/white logo hoopoe.jpg" 
              alt="Hoopoe Solutions" 
              className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-sm border"
            />
            <div className="text-4xl font-light text-muted-foreground">×</div>
            <img 
              src="/reno.png" 
              alt="Reno K" 
              className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-sm border"
            />
          </div>
          <h1 className="text-3xl font-medium mb-2 text-primary">Accès Projets</h1>
          <p className="text-muted-foreground">
            Plateforme de gestion de projets Hoopoe Solutions & Reno K
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Authentification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium text-center">
                  Code d'accès
                </label>
                <div className="relative">
                  <input
                    id="code"
                    type={showCode ? "text" : "password"}
                    {...register('code')}
                    placeholder="Entrez votre code d'accès..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-background text-center tracking-wider font-mono text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.code && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Vérification...' : 'Se connecter'}
              </button>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
