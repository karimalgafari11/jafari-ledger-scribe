
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, LineChart, Settings, AlertTriangle } from "lucide-react";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { InteractiveStatCard } from "@/components/ai/InteractiveStatCard";
import { QuickActionCard } from "@/components/ai/QuickActionCard";
import { AiSuggestionCard } from "@/components/ai/AiSuggestionCard";
