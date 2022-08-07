
import Header_Login from "../../widgets/Header_Login";
import Header from "../../widgets/Header";
import Hero from "../../widgets/Hero";
import Solutions from "../../widgets/Position";
import HowItWorks from "../../widgets/Organizations";
import Experts from "../../widgets/Experts";
import Footer from "../../widgets/Footer";
import ImageCard from "../../widgets/Article";
import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import './Individual_Home.css'

const Index= () => {
      // get user's id for checking
  const [params] = useSearchParams()
  const checkUserId =  params.get('checkUserId')
  
    return (<div className="container mx-auto p-4">
        <Header_Login />
        <main className="mt-20">
            <Hero />
            <section className="mt-20">
                <ImageCard />
            </section>
            <section className="md:p-20">
                <Solutions />
            </section>

            <section className="mt-20 md:w-3/5 mx-auto">
                <Experts />
            </section>
            <section>
                <HowItWorks className="mt-20" />
            </section>
        </main>
        <Footer />
    </div>
    );
}

export default Index;