<template>
  <footer class="footer">

    <div class="container">

      <!-- Footer Top -->
      <div class="footer-top">

        <!-- Brand -->
        <div class="footer-brand">

          <a href="#" class="logo">
            <span class="logo-icon">
              <i class="bi bi-car-front-fill"></i>
            </span>

            <span>CAR<span>HUB</span></span>
          </a>

          <p>
            Your trusted destination to discover, compare,
            and find the perfect car for your lifestyle.
          </p>

          <!-- Social -->
          <div class="social-links">

            <a href="#" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>

            <a href="#" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>

            <a href="#" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>

            <a href="#" aria-label="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>

          </div>

        </div>


        <!-- Navigation -->
        <div class="footer-column">

          <h4>Explore</h4>

          <ul>
            <li>
              <a href="#">Home</a>
            </li>

            <li>
              <a href="#">Browse Cars</a>
            </li>

            <li>
              <a href="#">Featured Cars</a>
            </li>

            <li>
              <a href="#">Features</a>
            </li>
          </ul>

        </div>


        <!-- Services -->
        <div class="footer-column">

          <h4>Services</h4>

          <ul>
            <li>
              <a href="#">Find a Car</a>
            </li>

            <li>
              <a href="#">Compare Cars</a>
            </li>

            <li>
              <a href="#">Favorites</a>
            </li>

            <li>
              <a href="#">Car Details</a>
            </li>
          </ul>

        </div>


        <!-- Contact -->
        <div class="footer-column contact-column">

          <h4>Get In Touch</h4>

          <div class="contact-item">

            <div class="contact-icon">
              <i class="bi bi-envelope"></i>
            </div>

            <div>
              <span>Email</span>
              <a href="mailto:hello@carhub.com">
                hello@carhub.com
              </a>
            </div>

          </div>


          <div class="contact-item">

            <div class="contact-icon">
              <i class="bi bi-telephone"></i>
            </div>

            <div>
              <span>Phone</span>
              <a href="tel:+2010xxxxxxxx">
                +20 10xxxxxxxxx
              </a>
            </div>

          </div>


          <div class="contact-item">

            <div class="contact-icon">
              <i class="bi bi-geo-alt"></i>
            </div>

            <div>
              <span>Location</span>
              <p>Egypt</p>
            </div>

          </div>

        </div>

      </div>


      <!-- Newsletter -->
      <div class="newsletter">

        <div class="newsletter-text">

          <div class="newsletter-icon">
            <i class="bi bi-envelope-paper"></i>
          </div>

          <div>
            <h3>Stay in the driver's seat.</h3>

            <p>
              Get the latest cars and updates delivered to your inbox.
            </p>
          </div>

        </div>


        <div class="newsletter-form">

          <input type="email" placeholder="Enter your email address" />

          <button>
            Subscribe
            <i class="bi bi-arrow-right"></i>
          </button>

        </div>

      </div>


      <!-- Bottom -->
      <div class="footer-bottom">

        <p>
          © 2026 CARHUB. All rights reserved.
        </p>

        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

    </div>

  </footer>
</template>


<style scoped>
.footer {
  position: relative;
  background: var(--dark);
  color: var(--white);
  padding: 75px 0 25px;
  overflow: hidden;
}


/* Decorative Circle */

.footer::before {
  content: "";
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.12;
  top: -250px;
  right: -150px;

  pointer-events: none;
}

.footer::after {
  content: "";
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: var(--primary);
  opacity: 0.07;
  bottom: -180px;
  left: -100px;

  pointer-events: none;
}


/* =========================
   FOOTER TOP
========================= */

.footer-top {
  position: relative;

  z-index: 1;

  display: grid;

  grid-template-columns: 2fr 1fr 1fr 1.5fr;

  gap: 50px;

  padding-bottom: 55px;
}


/* =========================
   LOGO
========================= */

.logo {
  display: inline-flex;

  align-items: center;

  gap: 10px;

  color: var(--white);

  text-decoration: none;

  font-size: 25px;

  font-weight: 800;

  letter-spacing: -0.5px;
}

.logo>span:last-child>span {
  color: var(--secondary);
}

.logo-icon {
  width: 42px;
  height: 42px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: var(--primary);

  color: var(--white);

  font-size: 20px;
}


/* =========================
   BRAND
========================= */

.footer-brand p {
  max-width: 330px;
  margin: 20px 0 25px;
  color: var(--text);
  font-size: 14px;
  line-height: 1.8;
}


/* =========================
   SOCIAL
========================= */

.social-links {
  display: flex;

  gap: 10px;
}

.social-links a {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
  text-decoration: none;
  transition: 0.3s ease;
}

.social-links a:hover {
  background: var(--primary);
  transform: translateY(-4px);
}


/* =========================
   COLUMNS
========================= */

.footer-column h4 {
  margin-bottom: 22px;
  color: var(--text);
  font-size: 16px;
  font-weight: 700;
}

.footer-column ul {
  list-style: none;

  margin: 0;
  padding: 0;
}

.footer-column li {
  margin-bottom: 12px;
}

.footer-column li a {
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
  transition: 0.3s ease;
}

.footer-column li a:hover {
  color: var(--secondary);

  padding-left: 5px;
}


/* =========================
   CONTACT
========================= */

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 17px;
}

.contact-icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(112, 193, 179, 0.12);
  color: var(--secondary);
}

.contact-item span {
  display: block;
  margin-bottom: 2px;
  color: var(--text);
  font-size: 11px;
}

.contact-item a,
.contact-item p {
  margin: 0;
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
}

.contact-item a:hover {
  color: var(--secondary);
}


/* =========================
   NEWSLETTER
========================= */

.newsletter {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 28px 30px;
  border-radius: var(--radius-card);
  background:
    linear-gradient(135deg,
      rgba(31, 111, 91, 0.35),
      rgba(112, 193, 179, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 40px;
}


/* Newsletter text */

.newsletter-text {
  display: flex;
  align-items: center;
  gap: 15px;
}

.newsletter-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background: var(--secondary);
  color: var(--dark);
  font-size: 21px;
}

.newsletter h3 {
  margin: 0 0 3px;
  font-size: 17px;
  font-weight: 700;
}

.newsletter p {
  margin: 0;
  color: var(--text);
  font-size: 12px;
}


/* Newsletter form */

.newsletter-form {
  display: flex;
  width: 400px;
  max-width: 100%;
  padding: 5px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
}

.newsletter-form input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  padding: 10px 14px;
  background: transparent;
  color: var(--text);
  font-size: 13px;
}

.newsletter-form input::placeholder {
  color: var(--text);
}

.newsletter-form button {
  border: none;
  padding: 10px 17px;
  border-radius: 9px;
  background: var(--secondary);
  color: var(--dark);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s ease;
}

.newsletter-form button:hover {
  background: var(--light);
}

.newsletter-form button i {
  margin-left: 5px;
}


/* =========================
   BOTTOM
========================= */

.footer-bottom {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-bottom p {
  margin: 0;
  color: var(--text);
  font-size: 12px;
}

.footer-bottom-links {
  display: flex;
  gap: 25px;
}

.footer-bottom-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 12px;
  transition: 0.3s ease;
}

.footer-bottom-links a:hover {
  color: var(--secondary);
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 991px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: span 2;
  }

  .newsletter {
    flex-direction: column;
    align-items: flex-start;
  }

  .newsletter-form {
    width: 100%;
  }

}


@media (max-width: 576px) {

  .footer {
    padding: 55px 0 20px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .footer-brand {
    grid-column: span 1;
  }

  .newsletter {
    padding: 22px;
  }

  .newsletter-text {
    align-items: flex-start;
  }

  .newsletter-form {
    flex-direction: column;
    background: transparent;
    padding: 0;
    gap: 8px;
  }

  .newsletter-form input {
    width: 100%;
    padding: 12px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.08);
  }

  .newsletter-form button {
    width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .footer-bottom-links {
    gap: 15px;
  }

}
</style>  