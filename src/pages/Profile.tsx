import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Settings, 
  Bell, 
  MapPin, 
  Heart,
  Star,
  Phone,
  Mail,
  Share2,
  Download,
  HelpCircle,
  LogOut
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const userStats = [
  { label: "Locais Visitados", value: "12", icon: MapPin },
  { label: "Favoritos", value: "8", icon: Heart },
  { label: "Avaliações", value: "15", icon: Star }
];

const recentActivity = [
  {
    action: "Visitou",
    place: "Vinícola Góes",
    date: "Hoje",
    rating: 5
  },
  {
    action: "Avaliou",
    place: "Parque Natural",
    date: "Ontem", 
    rating: 4
  },
  {
    action: "Favoritou",
    place: "Centro Histórico",
    date: "2 dias atrás",
    rating: null
  }
];

const quickActions = [
  { label: "Configurações", icon: Settings, description: "Personalize sua experiência" },
  { label: "Notificações", icon: Bell, description: "Gerencie alertas e avisos" },
  { label: "Ajuda", icon: HelpCircle, description: "Suporte e perguntas frequentes" },
  { label: "Compartilhar App", icon: Share2, description: "Indique para amigos" }
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Até breve!",
    });
    navigate("/auth");
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: action,
      description: `Abrindo ${action.toLowerCase()}...`,
    });
  };

  const handleCall = () => {
    toast({
      title: "Ligando...",
      description: "Conectando com suporte",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Email",
      description: "Abrindo cliente de email",
    });
  };

  const handleDownloadData = () => {
    toast({
      title: "Download iniciado",
      description: "Preparando seus dados pessoais conforme LGPD",
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{user?.name || "Turista São Roque"}</h1>
              <p className="text-primary-foreground/80">{user?.email || "turista@email.com"}</p>
              <Badge variant="secondary" className="mt-2">
                Usuário Ativo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {userStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-4">
                <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span> {activity.place}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                {activity.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < activity.rating ? 'fill-current text-warning' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              {index < recentActivity.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div 
                key={action.label} 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleQuickAction(action.label)}
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            );
          })}
          
          {/* Logout Button */}
          <div 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer border-t pt-4"
            onClick={handleLogout}
          >
            <div className="p-2 bg-red-100 rounded-lg">
              <LogOut className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-600">Sair</p>
              <p className="text-sm text-red-600/70">Desconectar da conta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Support */}
      <Card>
        <CardHeader>
          <CardTitle>Suporte & Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleCall}
            >
              <Phone className="h-4 w-4" />
              Ligar
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleEmail}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Button 
              variant="wine" 
              className="w-full"
              onClick={handleDownloadData}
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Dados Pessoais
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Seus dados são protegidos pela LGPD
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            App Turismo São Roque v1.0.0
          </p>
          <p className="text-xs text-muted-foreground">
            Desenvolvido para melhorar sua experiência turística
          </p>
        </CardContent>
      </Card>
    </div>
  );
}