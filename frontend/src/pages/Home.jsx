import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  return (
    <>
    <div className="px-4 pt-5 my-5 text-center border-bottom">
      <h1 className="display-4 fw-bold text-body-emphasis">
        Que ton nom soit Glorifié
      </h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Avec un repetoire de plus de 500 chants, tu as toute la louange dans
          ta boche. Loue et Glorifie le nom du Seigneur, partout et à tout
          moment. Parce que Chanter c'est prièrer deux fois, grandis dans ta vie
          de foi avec ces chants. Dans la joie comme dans la tristesse, Loue le
          Seigneur, car elle nourrit l'espérance et enlève de nous le doute.{" "}
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">
            Trouve un chant
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg px-4"
            onClick={() => navigate("/search")}
          >
            Index Alphabétique
          </button>
        </div>
      </div>
      <div className="overflow-hidden" style={{maxHeight: "30vh"}}>
        <div className="container px-5">
          <img
            src="./music.jpg"
            className="img-fluid border rounded-3 shadow-lg mb-4"
            alt="people singing"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
     <div className="container px-4 py-5" id="featured-3">
     <h2 className="pb-2 border-bottom">Pourquoi louer le Seigneur ? </h2>
     <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
       <div className="feature col">
         <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
           <img src="./rocket-takeoff.svg" alt="grandeur" height="30" />
         </div>
         <h3 className="fs-2 text-body-emphasis">Pour sa grandeur</h3>
         <p>Le Seigneur est le créateur de tout l'univers. Il a créé le monde de rien. Il est celui qui a existé avant tous les siècles. Il mérite toute la louange de ces créatures.</p>
         <a href="#" className="icon-link">
           Loue le Seigneur
           <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
         </a>
       </div>
       <div className="feature col">
         <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
           <img src="./chat-square-heart.svg" alt="amour" height="30"  />
         </div>
         <h3 className="fs-2 text-body-emphasis">Par amour pour lui</h3>
         <p>Car Dieu nous a tant aimés, qu'il a donné son fils comme sacrifice pour nos péchés (Jn 3: 16). En retour, nos chants résonnent comme un amour réciproque et une expression de gratitude. </p>
         <a href="#" className="icon-link">
           Loue le Seigneur
           <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
         </a>
       </div>
       <div className="feature col">
         <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
           <img src="./emoji-laughing.svg" alt="peace" height="30"/>
         </div>
         <h3 className="fs-2 text-body-emphasis">Pour avoir la paix</h3>
         <p>Nos chants n'ajoutent rien à la grandeur de Dieu. Elle nous rapproche de lui et permet de rester connecté à lui afin d'avoir la paix, joie et vraie liberté.</p>
         <a href="#" className="icon-link">
           Loue le Seigneur
           <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
         </a>
       </div>
     </div>
   </div>
   <div className="container">
     <div id="carouselExampleIndicators" className="carousel slide">
       <div className="carousel-indicators">
         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
       </div>
       <div className="carousel-inner">
         <div className="carousel-item">
           <img src="./3-happy-singing.jpg" className="d-block w-100" alt="..." />
         </div>
         <div className="carousel-item">
           <img src="./solo-singing.jpg" className="d-block w-100" alt="..." />
         </div>
         <div className="carousel-item active">
           <img src="./family-singing.jpg" className="d-block w-100" style={{height: "15%"}} alt="..."  />
         </div>
       </div>
       <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
         <span className="visually-hidden">Previous</span>
       </button>
       <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
         <span className="carousel-control-next-icon" aria-hidden="true"></span>
         <span className="visually-hidden">Next</span>
       </button>
     </div>
   </div>
   </>
  );
}

export default Home;
