import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Circle, Calendar, ArrowLeft, MessageCircle, Calculator, ShoppingCart, Database, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TimelinePhase {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: React.ReactNode;
  deliverables: string[];
}

const phases: TimelinePhase[] = [
  {
    id: 1,
    title: "Phase 1 - Workshop et Analyse",
    description: "Ateliers de travail collaboratifs et analyse approfondie des besoins métier",
    duration: "1 semaine",
    status: 'upcoming',
    icon: <MessageCircle className="w-6 h-6" />,
    deliverables: []
  },
  {
    id: 2,
    title: "Phase 2 - Modules Comptabilité, Contact, Vente & Achat",
    description: "Implémentation complète des modules comptabilité, gestion des contacts, ventes et achats",
    duration: "1 semaine",
    status: 'upcoming',
    icon: <Calculator className="w-6 h-6" />,
    deliverables: ["Module Comptabilité", "Module Contact", "Module Vente", "Module Achat"]
  },
  {
    id: 3,
    title: "Phase 3 - Migration des Données",
    description: "Migration et transfert sécurisé des données existantes vers le nouveau système",
    duration: "1 semaine",
    status: 'upcoming',
    icon: <Database className="w-6 h-6" />,
    deliverables: []
  },
  {
    id: 4,
    title: "Phase 4 - Formation des Équipes",
    description: "Formation complète des équipes à l'utilisation du nouveau système",
    duration: "1 semaine",
    status: 'upcoming',
    icon: <GraduationCap className="w-6 h-6" />,
    deliverables: ["Session de formation", "Vidéo de formation"]
  }
];

export function OdooTimeline() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'upcoming':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>;
      case 'current':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">À venir</Badge>;
      default:
        return <Badge variant="secondary">À venir</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            <div className="flex items-center gap-4">
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
              <h1 className="text-2xl font-medium text-primary">Intégration Odoo</h1>
              <p className="text-muted-foreground">Timeline de développement - 4 phases</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Project Overview */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl mb-2 text-primary">Timeline du Projet Odoo</h2>
              <p className="text-muted-foreground">Suivi des phases de développement et d'intégration</p>
            </div>
          </div>
        </div>

        {/* Timeline Horizontale */}
        <div className="relative overflow-x-auto">
          {/* Ligne de connexion horizontale */}
          <div className="relative mb-8">
            <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-200"></div>
            
            {/* Points et labels des phases */}
            <div className="flex justify-between items-start relative px-12">
              {phases.map((phase, index) => (
                <div key={phase.id} className="flex flex-col items-center relative">
                  {/* Point de timeline */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-full border-4 border-white ${getStatusColor(phase.status)} flex items-center justify-center`}>
                      <div className="text-white">
                        {phase.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Label de phase */}
                  <div className="mt-4 text-center min-w-0">
                    <div className="mb-1">{getStatusBadge(phase.status)}</div>
                    <h3 className="text-sm mb-1">{phase.title}</h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{phase.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cartes détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-items-center">
            {phases.map((phase) => (
              <Card key={phase.id} className={`w-full max-w-sm transition-all duration-300 hover:shadow-lg ${
                phase.status === 'current' ? 'ring-2 ring-blue-500' : ''
              }`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                  
                  {phase.deliverables.length > 0 && (
                    <div>
                      <h4 className="text-xs mb-2">Livrables:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="leading-tight">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer avec informations supplémentaires */}
        <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-1 text-primary font-bold">4</div>
              <div className="text-sm text-muted-foreground">Phases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1 text-primary font-bold">4</div>
              <div className="text-sm text-muted-foreground">Semaines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1 text-primary font-bold">0%</div>
              <div className="text-sm text-muted-foreground">Progression</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
