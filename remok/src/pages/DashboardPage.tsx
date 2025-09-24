import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Database, 
  ArrowRight, 
  LogOut, 
  Calendar,
  Users,
  Zap,
  Brain
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const projects = [
    {
      id: 'odoo',
      title: 'Intégration Odoo',
      description: 'Implémentation complète du système Odoo avec modules comptabilité, vente, achat et formation des équipes.',
      icon: <Database className="w-8 h-8" />,
      phases: 4,
      duration: '4 semaines',
      status: 'À venir',
      color: 'bg-primary',
      route: '/timeline/odoo',
      features: ['Module Comptabilité', 'Gestion Contacts', 'Vente & Achat', 'Migration Données', 'Formation']
    },
    {
      id: 'website',
      title: 'E-commerce + Chatbot IA',
      description: 'Intégration e-commerce Odoo avec chatbot intelligent pour améliorer l\'expérience client et automatiser les ventes.',
      icon: <Brain className="w-8 h-8" />,
      phases: 3,
      duration: '3 semaines',
      status: 'À venir',
      color: 'bg-secondary',
      route: '/timeline/website',
      features: ['Analyse & Cadrage', 'Site E-commerce Odoo', 'Chatbot Intelligent', 'Formation & Tests']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/white logo hoopoe.jpg" 
                  alt="Hoopoe Solutions" 
                  className="w-6 h-6 object-contain rounded-md bg-white p-0.5 shadow-sm border"
                />
                <img 
                  src="/reno.png" 
                  alt="Reno K" 
                  className="w-6 h-6 object-contain rounded-md bg-white p-0.5 shadow-sm border"
                />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-primary">Tableau de Bord Projets</h1>
                <p className="text-muted-foreground">Sélectionnez un projet pour voir sa timeline</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">7</p>
                <p className="text-muted-foreground text-sm">Semaines Total</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-secondary/20 hover:border-secondary/40 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">2</p>
                <p className="text-muted-foreground text-sm">Projets Actifs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">0%</p>
                <p className="text-muted-foreground text-sm">Progression</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              onClick={() => navigate(project.route)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${project.color} rounded-lg text-white`}>
                      {project.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{project.status}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {project.phases} phases • {project.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Fonctionnalités clés:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cliquez pour voir la timeline</span>
                    <div className="flex items-center gap-1 text-primary font-medium">
                      Démarrer
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
