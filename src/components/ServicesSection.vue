```vue
<template>
  <section class="services-section">

    <div class="container">

      <!-- Header -->
      <div class="services-header">

        <div>
          <span class="services-badge">OUR SERVICES</span>

          <h2>
            More Than Just
            <span>Cars</span>
          </h2>
        </div>

        <p>
          Everything you need to buy, sell, and take care
          of your car in one simple platform.
        </p>

      </div>


      <!-- Services -->
      <div class="services-list">

        <!-- Service 01 -->
        <div class="service-item">

          <div class="service-number">
            01
          </div>

          <div class="service-icon">
            <i class="bi bi-car-front-fill"></i>
          </div>

          <div class="service-info">

            <h3>Find Your Car</h3>

            <p>
              Search and discover cars that match
              your budget, lifestyle, and preferences.
            </p>

          </div>

          <button class="service-btn">
            <i class="bi bi-arrow-up-right"></i>
          </button>

        </div>


        <!-- Service 02 -->
        <div class="service-item">

          <div class="service-number">
            02
          </div>

          <div class="service-icon">
            <i class="bi bi-tag-fill"></i>
          </div>

          <div class="service-info">

            <h3>Sell Your Car</h3>

            <p>
              Create your listing and connect with
              potential buyers easily and quickly.
            </p>

          </div>

          <button class="service-btn">
            <i class="bi bi-arrow-up-right"></i>
          </button>

        </div>


        <!-- Service 03 -->
        <div class="service-item">

          <div class="service-number">
            03
          </div>

          <div class="service-icon">
            <i class="bi bi-tools"></i>
          </div>

          <div class="service-info">

            <h3>Car Care</h3>

            <p>
              Find maintenance, repair, and other
              services to keep your car running smoothly.
            </p>

          </div>

          <button class="service-btn">
            <i class="bi bi-arrow-up-right"></i>
          </button>

        </div>

      </div>

    </div>

  </section>
</template>


<style scoped>

.services-section {

  padding: 75px 0;

  background: #F7FFF7;

  font-family:
    "Poppins",
    "Cairo",
    sans-serif;

}


/* =========================
   HEADER
========================= */

.services-header {

  display: flex;

  align-items: end;

  justify-content: space-between;

  gap: 30px;

  margin-bottom: 40px;

}


.services-badge {

  display: inline-block;

  margin-bottom: 12px;

  padding: 6px 14px;

  border: 1px solid #70C1B3;

  border-radius: 30px;

  color: #1F6F5B;

  background: rgba(112, 193, 179, .12);

  font-size: 11px;

  font-weight: 700;

  letter-spacing: .8px;

}


.services-header h2 {

  margin: 0;

  color: #102A27;

  font-size: clamp(32px, 5vw, 45px);

  font-weight: 700;

  line-height: 1.1;

  letter-spacing: -1.5px;

}


.services-header h2 span {

  color: #1F6F5B;

}


.services-header > p {

  max-width: 390px;

  margin: 0;

  color: #102A27;

  opacity: .65;

  font-size: 14px;

  line-height: 1.7;

}


/* =========================
   SERVICE ITEM
========================= */

.service-item {

  position: relative;

  display: grid;

  grid-template-columns:
    60px
    70px
    1fr
    50px;

  align-items: center;

  gap: 25px;

  padding: 25px 20px;

  border-top: 1px solid
    rgba(31, 111, 91, .2);

  transition: .3s ease;

}


.service-item:last-child {

  border-bottom: 1px solid
    rgba(31, 111, 91, .2);

}


/* Hover */

.service-item:hover {

  padding-left: 30px;

  padding-right: 30px;

  background: #B2DBBF;

  border-radius: 12px;

}


/* =========================
   NUMBER
========================= */

.service-number {

  color: #1F6F5B;

  font-size: 13px;

  font-weight: 700;

}


/* =========================
   ICON
========================= */

.service-icon {

  width: 58px;

  height: 58px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 15px;

  background:
    linear-gradient(
      135deg,
      #1F6F5B,
      #70C1B3
    );

  color: #F7FFF7;

  font-size: 23px;

  transition: .3s ease;

}


.service-item:hover .service-icon {

  transform:
    rotate(-5deg)
    scale(1.08);

}


/* =========================
   INFO
========================= */

.service-info h3 {

  margin: 0 0 6px;

  color: #102A27;

  font-size: 20px;

  font-weight: 700;

}


.service-info p {

  max-width: 650px;

  margin: 0;

  color: #102A27;

  opacity: .65;

  font-size: 13px;

  line-height: 1.6;

}


/* =========================
   BUTTON
========================= */

.service-btn {

  width: 45px;

  height: 45px;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 1px solid #70C1B3;

  border-radius: 50%;

  background: transparent;

  color: #1F6F5B;

  font-size: 17px;

  cursor: pointer;

  transition: .3s ease;

}


.service-item:hover .service-btn {

  background: #102A27;

  border-color: #102A27;

  color: #F7FFF7;

  transform:
    rotate(45deg);

}


/* =========================
   TABLET
========================= */

@media (max-width: 768px) {

  .services-header {

    align-items: start;

    flex-direction: column;

  }

  .services-header > p {

    max-width: 600px;

  }

  .service-item {

    grid-template-columns:
      45px
      55px
      1fr
      45px;

    gap: 15px;

  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 576px) {

  .services-section {

    padding: 55px 0;

  }

  .services-header {

    margin-bottom: 25px;

  }

  .service-item {

    grid-template-columns:
      40px
      50px
      1fr;

    gap: 12px;

    padding: 20px 5px;

  }

  .service-item:hover {

    padding-left: 10px;

    padding-right: 10px;

  }

  .service-icon {

    width: 48px;

    height: 48px;

    font-size: 19px;

  }

  .service-info h3 {

    font-size: 16px;

  }

  .service-info p {

    font-size: 11px;

  }

  .service-btn {

    display: none;

  }

}

</style>
```
