
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { AlertCircle, BookOpen, FileText, Video } from 'lucide-react';

export interface GuideSection {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

export interface GuideCategory {
  id: string;
  title: string;
  icon?: React.ReactNode;
  sections: GuideSection[];
}

interface UserGuideContentProps {
  categories: GuideCategory[];
  defaultCategory?: string;
}

export function UserGuideContent({ categories, defaultCategory }: UserGuideContentProps) {
  const [activeTab, setActiveTab] = React.useState<string>(defaultCategory || categories[0]?.id || '');
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              {category.icon}
              <span>{category.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {category.sections.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="text-left">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {section.description && (
                      <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                    )}
                    <div>{section.content}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export function VideoTutorial({ title, videoUrl, thumbnail, duration }: { 
  title: string; 
  videoUrl: string; 
  thumbnail?: string;
  duration?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Video className="h-12 w-12 text-muted-foreground opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-primary border-b-[8px] border-b-transparent ml-1"></div>
          </div>
        </div>
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs">
            {duration}
          </div>
        )}
      </div>
      <CardHeader className="py-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export function TipCard({ title, content, type = 'info' }: { 
  title: string; 
  content: React.ReactNode; 
  type?: 'info' | 'warning' | 'tip' 
}) {
  const getStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'tip':
        return 'bg-success/10 border-success/20';
      case 'info':
      default:
        return 'bg-info/10 border-info/20';
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'tip':
        return <BookOpen className="h-5 w-5 text-success" />;
      case 'info':
      default:
        return <FileText className="h-5 w-5 text-info" />;
    }
  };

  return (
    <Card className={`border ${getStyles()}`}>
      <CardHeader className="py-3 flex flex-row items-center gap-2">
        {getIcon()}
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {typeof content === 'string' ? <p>{content}</p> : content}
      </CardContent>
    </Card>
  );
}
