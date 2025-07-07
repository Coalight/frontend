// app/components/ai-page.tsx
"use client";

import { motion } from "framer-motion";
import { Rocket, BrainCircuit, Bot, BarChart, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "Deep Learning",
    description: "Advanced neural networks for complex problem solving",
  },
  {
    icon: <Bot className="h-6 w-6" />,
    title: "Natural Language",
    description: "Human-like conversation and text understanding",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Data Insights",
    description: "Transform raw data into actionable intelligence",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-time Processing",
    description: "Instant analysis and response capabilities",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function AIPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 px-4 py-2 rounded-full mb-6"
          >
            <Rocket className="h-5 w-5" />
            <span className="font-medium">Next Generation AI Platform</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Intelligent Solutions <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Harness the power of artificial intelligence to transform your
            business with our cutting-edge platform.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button size="lg" className="gap-2">
              Get Started
              <Zap className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                variants={itemVariants}
              >
                <Card className="h-full hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="dark:text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo Section */}
        <motion.section
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Experience AI Firsthand
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try our AI model with your own data and see the results in
                real-time.
              </p>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="prompt"
                    className="mb-2 block dark:text-gray-300"
                  >
                    Enter your prompt
                  </Label>
                  <Input
                    id="prompt"
                    placeholder="Ask me anything..."
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Generate Response
                </Button>
              </div>
            </div>

            <motion.div
              className="bg-gray-50 dark:bg-gray-700 p-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-sm border dark:border-gray-500 w-full h-64 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-300 text-center">
                  AI generated response will appear here...
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={itemVariants}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join thousands of companies leveraging our AI platform to drive
              innovation and growth.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="secondary"
                className="text-indigo-600 font-semibold dark:text-indigo-700"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
