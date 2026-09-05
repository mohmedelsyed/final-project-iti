```vue
<template>
  <section class="role-section">

    <div class="container">

      <!-- Section Header -->
      <div class="role-header">

        <span class="role-badge">
          GET STARTED
        </span>

        <h2>
          What are you <span>looking for?</span>
        </h2>

        <p>
          Choose how you want to use our platform.
        </p>

      </div>


      <!-- Roles -->
      <div class="row g-4 justify-content-center">

        <!-- Buyer -->
        <div class="col-lg-4 col-md-6">

          <div
            class="role-card"
            @click="selectRole('buyer')"
            :class="{ active: selectedRole === 'buyer' }"
          >

            <div class="role-icon">
              <i class="bi bi-car-front-fill"></i>
            </div>

            <div class="role-content">

              <h3>
                I'm Looking for a Car
              </h3>

              <p>
                Browse cars and find the perfect one
                for your needs and budget.
              </p>

            </div>

            <div class="role-arrow">
              <i class="bi bi-arrow-right"></i>
            </div>

          </div>

        </div>


        <!-- Seller -->
        <div class="col-lg-4 col-md-6">

          <div
            class="role-card"
            @click="selectRole('seller')"
            :class="{ active: selectedRole === 'seller' }"
          >

            <div class="role-icon">
              <i class="bi bi-tag-fill"></i>
            </div>

            <div class="role-content">

              <h3>
                I'm Selling a Car
              </h3>

              <p>
                List your car and reach people
                looking for their next vehicle.
              </p>

            </div>

            <div class="role-arrow">
              <i class="bi bi-arrow-right"></i>
            </div>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>


<script setup>

import { ref } from "vue";

const selectedRole = ref(null);

const selectRole = (role) => {

  selectedRole.value = role;

  console.log("Selected Role:", role);

};

</script>


<style scoped>
.role-section {
  padding: 65px 0;
   background:
    linear-gradient(
      45deg,
      #70C1B3
    );

  font-family: "Poppins", "Cairo", sans-serif;
}


/* =========================
   HEADER
========================= */

.role-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 35px;
}


.role-badge {
  display: inline-block;
  padding: 6px 15px;
  margin-bottom: 12px;
  border-radius: 30px;
  border: 1px solid #70C1B3;
  background: rgba(112, 193, 179, .12);
  color: #1F6F5B;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .8px;
}


.role-header h2 {
  margin-bottom: 10px;
  color: #102A27;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -1px;
}


.role-header h2 span {
  color: #1F6F5B;
}


.role-header p {
  margin: 0;
  color: #102A27;
  opacity: .65;
  font-size: 14px;
}


/* =========================
   ROLE CARD
========================= */

.role-card {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px;
  cursor: pointer;
  background: rgba(247, 255, 247, .9);
  border: 1px solid rgba(112, 193, 179, .35);
  border-radius: 18px;
  box-shadow:
    0 8px 25px rgba(16, 42, 39, .07);
  transition: all .3s ease;
}


/* Hover */

.role-card:hover {
  transform: translateY(-6px);
  border-color: #70C1B3;
  box-shadow:
    0 15px 35px rgba(16, 42, 39, .13);
}


/* Active */

.role-card.active {
  border-color: #1F6F5B;
  background: #F7FFF7;
  box-shadow:
    0 0 0 3px rgba(31, 111, 91, .15);
}


/* =========================
   ICON
========================= */

.role-icon {
  min-width: 55px;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background:
    linear-gradient(
      135deg,
      #1F6F5B,
      #70C1B3
    );

  color: #F7FFF7;
  font-size: 23px;
  box-shadow:
    0 7px 18px rgba(31, 111, 91, .2);
  transition: .3s ease;
}


.role-card:hover .role-icon {
  transform: scale(1.08);

}


/* =========================
   CONTENT
========================= */

.role-content {
  flex: 1;
}


.role-content h3 {
  margin: 0 0 6px;
  color: #102A27;
  font-size: 18px;
  font-weight: 700;

}


.role-content p {
  margin: 0;
  color: #102A27;
  opacity: .65;
  font-size: 13px;
  line-height: 1.5;

}


/* =========================
   ARROW
========================= */

.role-arrow {
  color: #1F6F5B;
  font-size: 18px;
  transition: .3s ease;
}


.role-card:hover .role-arrow {
  transform: translateX(5px);
  color: #102A27;

}


/* =========================
   MOBILE
========================= */

@media (max-width: 576px) {

  .role-section {

    padding: 50px 0;

  }

  .role-header h2 {

    font-size: 30px;

  }

  .role-card {

    padding: 19px;

  }

  .role-icon {

    min-width: 48px;

    width: 48px;

    height: 48px;

    font-size: 20px;

  }

  .role-content h3 {

    font-size: 16px;

  }

  .role-content p {

    font-size: 12px;

  }

}

</style>
```
