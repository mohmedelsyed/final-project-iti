<template>
  <section class="hero-section">
    <div class="container">

      <!-- Title -->
      <div class="text-center mb-5">
        <h2 class="text-white">Search Cars</h2>
      </div>

      <div class="row align-items-center g-5">

        <!-- LEFT : Search Card -->
        <div class="col-lg-5">

          <div class="search-car bg-white rounded-4 shadow p-4">

            <h2 class="fw-bold mb-4">
              Start your search
            </h2>

            <!-- Budget -->
            <div class="d-flex justify-content-between align-items-center mb-2">

              <label class="fw-bold text-black">
                Your budget
              </label>

              <span class="budget-value text-primary fw-bold">
                EGP 500,000
              </span>

            </div>

            <!-- Range -->
            <input
              type="range"
              class="form-range mb-2"
              min="300000"
              max="5000000"
              step="50000"
              value="1000000"
            />

            <div class="d-flex justify-content-between text-secondary small mb-4">
              <span>300K</span>
              <span>5M EGP</span>
            </div>

            <!-- Location -->
            <label class="form-label fw-bold text-black">
              Your Location
            </label>

            <select
              v-model="city"
              class="form-select mb-3"
            >

              <option value="">
                📍 Select your city
              </option>

              <option value="Cairo">
                Cairo
              </option>

              <option value="Giza">
                Giza
              </option>

              <option value="Alexandria">
                Alexandria
              </option>

              <option value="Mansoura">
                Mansoura
              </option>

              <option value="Tanta">
                Tanta
              </option>

              <option value="Ismailia">
                Ismailia
              </option>

            </select>

            <!-- Detect Location -->
            <button
              class="btn btn-dark rounded-3 w-100 mb-3"
              @click="detectLocation"
            >
              {{ detecting ? "Detecting..." : "◎ Detect my location" }}
            </button>

            <!-- Search -->
            <button
              class="btn btn-primary rounded-3 w-100"
              @click="searchCars"
            >
              <span>⌕</span>
              Search matching cars
            </button>

          </div>

        </div>


        <!-- RIGHT : Hero Content -->
        <div class="col-lg-7">

          <div class="hero-content">

            <div class="badge">
              ✨ SMART CAR MATCHING
            </div>

            <h1>
              <span>Find the right car</span><br>
              <span>for your budget</span><br>
              <span>and your city.</span>
            </h1>

            <p>
              Tell CarHub what you can spend and where you are.
              We calculate real distance to every dealer, score each
              car against your preferences and show you the best matches first.
            </p>

            <!-- Stats -->
            <div class="stats">

              <div class="stat">
                <strong>18</strong>
                <span>VERIFIED LISTINGS</span>
              </div>

              <div class="stat">
                <strong>6</strong>
                <span>CITIES COVERED</span>
              </div>

              <div class="stat">
                <strong>8</strong>
                <span>AUTO SERVICES</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style >

.hero-section {
  min-height: 80vh;
  padding: 64px 0;

  display: flex;
  align-items: center;

  background:
    linear-gradient(
      45deg,
      #102A27,
      #1F6F5B,
      #70C1B3,
      #B2DBBF,
      #F7FFF7
    );
}


/* =========================
   SEARCH CARD
========================= */

.search-car {
  width: 100%;
  max-width: 470px;
  margin: auto;

  background-color: var(--white);
  color: var(--text);

  border-radius: var(--radius-card);

  box-shadow: var(--shadow-card);

  padding: 24px;
}


/* Search Title */

.search-car h2 {
  color: var(--dark);
  font-size: 28px;
  font-weight: 700;
}


/* Budget */

.budget-value {
  color: var(--primary) !important;
  font-size: 18px;
}


/* Range */

.search-car .form-range {
  accent-color: var(--primary);
}


/* Location */

.search-car .form-label {
  color: var(--dark) !important;
  font-weight: 600;
}

.search-car .form-select {
  border: 1px solid var(--light);
  border-radius: var(--radius-input);

  color: var(--dark);
  background-color: var(--white);
}

.search-car .form-select:focus {
  border-color: var(--primary);

  box-shadow:
    0 0 0 3px rgba(112, 193, 179, 0.25);
}


/* Buttons */

.search-car .btn-dark {
  background-color: var(--dark);
  border-color: var(--dark);
}

.search-car .btn-dark:hover {
  background-color: var(--primary);
  border-color: var(--primary);
}

.search-car .btn-primary {
  background-color: var(--primary);
  border-color: var(--primary);
}

.search-car .btn-primary:hover {
  background-color: var(--dark);
  border-color: var(--dark);
}


/* =========================
   HERO CONTENT
========================= */

.hero-content {
  max-width: 650px;

  color: var(--white);

  font-family: "Poppins", "Cairo", sans-serif;
}


/* Badge */

.hero-content .badge {
  display: inline-block;

  padding: 8px 15px;

  border: 1px solid var(--secondary);
  border-radius: 30px;

  color: var(--secondary);

  background-color: transparent;

  font-size: 13px;
  font-weight: 700;

  letter-spacing: .4px;

  margin-bottom: 24px;
}


/* Title */

.hero-content h1 {
  margin-bottom: 24px;

  font-size: clamp(45px, 6vw, 75px);

  line-height: 1;

  letter-spacing: -3px;

  font-weight: 700;

  color: var(--white);
}

.hero-content h1 span {
  background-color: var(--primary);

  padding: 0 5px;

  box-shadow:
    8px 0 var(--primary),
    -3px 0 var(--primary);

  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}


/* Description */

.hero-content p {
  max-width: 620px;

  margin-bottom: 32px;

  color: var(--white);

  font-size: 18px;

  line-height: 1.6;
}


/* =========================
   STATS
========================= */

.stats {
  display: flex;
  gap: 48px;
  border-radius: 8px;
  background-color: var(--light);
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  
}

.stat strong {
  color: var(--secondary);
  font-size: 28px;
  font-weight: 700;
}

.stat span {
  color: var(--light);
  font-size: 11px;
  letter-spacing: .4px;
}


/* =========================
   TABLET
========================= */

@media (max-width: 991px) {

  .hero-section {
    padding: 50px 0;
  }
  .search-car {
    margin-bottom: 40px;
  }
  .hero-content {
    max-width: 100%;
    text-align: center;
  }
  .stats {
    justify-content: center;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 576px) {

  .hero-section {
    padding: 40px 0;
  }

  .hero-content h1 {
    font-size: 40px;
    letter-spacing: -2px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .stats {
    gap: 20px;
  }

  .stat strong {
    font-size: 23px;
  }

  .stat span {
    font-size: 9px;
  }

}

</style>