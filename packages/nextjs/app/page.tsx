"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Clock, Gift, MessageSquare, Palette } from "lucide-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
            Send digital group card/gift NFTs to Families, Friends, Coworkers, and more
          </h1>

          <div className="space-y-4 mb-12">
            <p className="text-xl md:text-2xl text-gray-600">Unique group card with messages, GIFs, photos & videos</p>
            <p className="text-xl md:text-2xl text-gray-600">Collect unlimited contribution in any digit assets</p>
          </div>

          <button
            onClick={() => router.push("/giftbox/create")}
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-200 flex items-center mx-auto gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How it Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Start your gift box in seconds</h3>
              <p className="text-gray-600">Quick and easy setup to get your digital gift box ready</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalize it with stylish designs</h3>
              <p className="text-gray-600">Choose from our collection of beautiful templates and customize them</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Invite your group to add their messages</h3>
              <p className="text-gray-600">Let everyone contribute with photos, videos, voice notes & GIFs</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Send when ready or schedule</h3>
              <p className="text-gray-600">Deliver instantly or set a future date for the perfect moment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
