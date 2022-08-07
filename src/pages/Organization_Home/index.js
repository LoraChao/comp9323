
import React from "react";
import Header from "../../widgets/Header";
import Hero from "../../widgets/Hero_O";
import Footer from "../../widgets/Footer";
import JobList from "../../widgets/JobList";
import './Organization_Home.css'

function Index() {

    return (<div className="container mx-auto p-4">
         <Header />
         <main className="mt-20">
             <Hero />
             <section className="mt-20">
                 <JobList />
             </section>
         </main>
         <Footer />
    </div>
    );
}

export default Index;