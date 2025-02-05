"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ThumbsDown, Users, Coffee, Scale } from "lucide-react";
import { useEffect } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const vantaEffect = NET({
      el: "#vanta-bg",
      THREE: THREE, 
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xffffff,
      backgroundColor: 0x0,
      points: 20.00,
      maxDistance: 12.00
    });
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (  
    <div id="vanta-bg" className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>
        <main className="container mx-auto px-6 py-16">
          <div 
            className="text-center space-y-6"
          >
            <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
            <TextGenerateEffect words={"Welcome To SinkedIn"} />
            </h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay:1.5 , type: "tween" }}
            className="text-center space-y-6"
            >
              <br />
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The professional network where failure is the new success. Share your rejections, 
                celebrate your setbacks, and connect with fellow underachievers.
              </p>
            </motion.div>
            <div className="flex gap-4 justify-center mt-8">
              <motion.div 
              whileHover={{scale:1.1}}
              whileTap={{scale:0.8}}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, transition:{delay:2} }}
              >
                <Link href="/feed">
                  <Button size="lg">
                    <span className="md:text-sm text-xs"> Join The Struggle </span> <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
                <motion.div 
                whileHover={{scale:1.1}}
                whileTap={{scale:0.8}}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition:{delay:2} }}
                >
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    How We Sank In
                  </Button>
                </Link>
              </motion.div>
            </div>

          {/* <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            <div className="p-6 rounded-lg border bg-card">
              <ThumbsDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Setbacks</h3>
              <p className="text-muted-foreground">Share your rejected applications and celebrate career mishaps.</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Failure Network</h3>
              <p className="text-muted-foreground">Connect with others who are equally unsuccessful.</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <Coffee className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Disappointments</h3>
              <p className="text-muted-foreground">Share your daily struggles and workplace disasters.</p>
            </div>
          </motion.div> */}
        </main>
    </div>
  );
}