import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Lock, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(code)) {
      navigate('/dashboard');
    } else {
      setError('Code d\'accès invalide. Veuillez réessayer.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img 
              src="/white logo hoopoe.jpg" 
              alt="Hoopoe Solutions" 
              className="w-12 h-12 object-contain rounded-lg bg-white p-1 shadow-sm border"
            />
            <div className="text-2xl font-light text-muted-foreground">×</div>
            <img 
              src="/reno.png" 
              alt="Reno K" 
              className="w-12 h-12 object-contain rounded-lg bg-white p-1 shadow-sm border"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium mb-2">
                  Code d'accès
                </label>
                <div className="relative">
                  <input
                    id="code"
                    type={showCode ? "text" : "password"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Entrez votre code..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-input-background"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !code.trim()}
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
