import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  attendees: number;
  imageUrl: string;
}

const EventCard = ({ 
  title, 
  description, 
  date, 
  time, 
  location, 
  price, 
  category, 
  attendees, 
  imageUrl 
}: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/90 text-foreground border-white/50">
            {price}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground line-clamp-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-vibrant-orange" />
            <span>{date}</span>
            <Clock className="h-4 w-4 ml-4 mr-2 text-vibrant-orange" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-vibrant-orange" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-vibrant-orange" />
            <span>{attendees} going</span>
          </div>
        </div>
        
        <Button className="w-full" variant="vibrant">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;
