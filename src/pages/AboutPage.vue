
<script setup lang="ts">
import {
  CupSoda,
  Coffee,
  Citrus,
  GlassWater,
  Sparkles,
  Flame,
  Gift,
  ArrowRight
} from 'lucide-vue-next'

import { useRouter } from 'vue-router'

const router = useRouter()

// ================= TEAM MEMBERS =================

const teamMembers = [
  {
    name: 'Seng Meysean',
    role: 'Milk Tea, Coffee & Fruit Tea',
    description:
      'Seng Meysean specializes in creating delicious Milk Tea, Coffee, and Fruit Tea with fresh ingredients and great taste.',

    drinks: [
      {
        name: 'Milk Tea',
        icon: CupSoda
      },
      {
        name: 'Coffee',
        icon: Coffee
      },
      {
        name: 'Fruit Tea',
        icon: Citrus
      }
    ]
  },

  {
    name: 'Meun Seangheng',
    role: 'Smoothie & Juice',
    description:
      'Meun Seangheng creates refreshing Smoothies and Juices that are perfect for anyone looking for a fresh and fruity drink.',

    drinks: [
      {
        name: 'Smoothie',
        icon: GlassWater
      },
      {
        name: 'Juice',
        icon: Sparkles
      }
    ]
  },

  {
    name: 'Chandara',
    role: 'Matcha & Specials',
    description:
      'Chandara prepares delicious Matcha drinks and our special drinks, bringing unique flavors and creative ideas to every cup.',

    drinks: [
      {
        name: 'Matcha',
        icon: Flame
      },
      {
        name: 'Specials',
        icon: Gift
      }
    ]
  }
]


// ================= GO TO DRINKS =================

const goToDrinks = () => {
  router.push('/drinks')
}
</script>


<template>
  <main class="about-page">

    <!-- ================= HERO ================= -->

    <section class="about-hero">

      <div class="hero-content">

        <span class="hero-label">
          ABOUT OUR TEAM
        </span>

        <h1>
          Meet the Team Behind
          <span>Our Drinks</span>
        </h1>

        <p>
          We are a team of passionate drink makers who
          love creating fresh, delicious drinks and happy
          moments for everyone.
        </p>

      </div>

    </section>


    <!-- ================= INTRO ================= -->

    <section class="intro-section">

      <div class="section-title">

        <span>OUR TEAM</span>

        <h2>
          Who Makes Your Favorite Drinks?
        </h2>

        <p>
          Each member of our team is responsible for
          different drink categories. Together, we create
          a variety of drinks for you to enjoy.
        </p>

      </div>


      <!-- ================= TEAM CARDS ================= -->

      <div class="team-grid">

        <article
          v-for="member in teamMembers"
          :key="member.name"
          class="team-card"
        >

          <!-- Avatar -->

          <div class="member-avatar">
            {{ member.name.charAt(0) }}
          </div>


          <!-- Member Info -->

          <div class="member-info">

            <h3>
              {{ member.name }}
            </h3>

            <span class="member-role">
              {{ member.role }}
            </span>

            <p class="member-description">
              {{ member.description }}
            </p>


            <!-- Drinks -->

            <div class="drinks-title">
              Drinks
            </div>

            <div class="drink-list">

              <div
                v-for="drink in member.drinks"
                :key="drink.name"
                class="drink-item"
              >

                <div class="drink-icon">
                  <component
                    :is="drink.icon"
                    :size="19"
                  />
                </div>

                <span>
                  {{ drink.name }}
                </span>

              </div>

            </div>

          </div>

        </article>

      </div>

    </section>


    <!-- ================= CTA ================= -->

    <section class="cta-section">

      <div class="cta-content">

        <div class="cta-icon">
          <CupSoda :size="32" />
        </div>

        <div>
          <h2>
            Ready to Find Your Favorite Drink?
          </h2>

          <p>
            Explore all of our drinks and discover
            something delicious.
          </p>
        </div>

        <button
          class="cta-button"
          @click="goToDrinks"
        >
          Explore Drinks

          <ArrowRight :size="19" />
        </button>

      </div>

    </section>

  </main>
</template>


<style scoped>

/* ================= PAGE ================= */

.about-page {
  min-height: 100vh;
  background: #fdfbfb;
  color: #222;
}


/* ================= HERO ================= */

.about-hero {
  background:
    linear-gradient(
      135deg,
      #fce4ec 0%,
      #f8bbd0 50%,
      #f3e5f5 100%
    );

  padding: 85px 20px;

  text-align: center;

  border-bottom: 1px solid #f8bbd0;
}


.hero-content {
  max-width: 800px;
  margin: 0 auto;
}


.hero-label {
  display: inline-block;

  padding: 7px 16px;

  border-radius: 20px;

  background: white;

  color: #d81b60;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.5px;

  margin-bottom: 18px;

  box-shadow:
    0 4px 15px rgba(216, 27, 96, 0.08);
}


.about-hero h1 {
  font-size: 48px;

  line-height: 1.15;

  margin: 0 auto 20px;

  color: #251014;

  font-weight: 900;

  letter-spacing: -1px;
}


.about-hero h1 span {
  color: #d81b60;
  display: block;
}


.about-hero p {
  max-width: 650px;

  margin: 0 auto;

  color: #666;

  font-size: 17px;

  line-height: 1.7;
}


/* ================= INTRO ================= */

.intro-section {
  max-width: 1200px;

  margin: 0 auto;

  padding: 70px 20px;
}


.section-title {
  text-align: center;

  max-width: 700px;

  margin: 0 auto 45px;
}


.section-title > span {
  color: #d81b60;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 1.5px;
}


.section-title h2 {
  margin: 10px 0 12px;

  font-size: 32px;

  font-weight: 900;

  color: #251014;
}


.section-title p {
  margin: 0;

  color: #777;

  font-size: 15px;

  line-height: 1.7;
}


/* ================= TEAM GRID ================= */

.team-grid {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 25px;
}


/* ================= TEAM CARD ================= */

.team-card {
  background: white;

  border: 1px solid #f8bbd0;

  border-radius: 22px;

  padding: 30px;

  box-shadow:
    0 8px 25px rgba(216, 27, 96, 0.06);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}


.team-card:hover {
  transform: translateY(-6px);

  box-shadow:
    0 15px 35px rgba(216, 27, 96, 0.12);
}


/* ================= AVATAR ================= */

.member-avatar {
  width: 70px;

  height: 70px;

  border-radius: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 20px;

  background:
    linear-gradient(
      135deg,
      #fce4ec,
      #f8bbd0
    );

  color: #d81b60;

  font-size: 28px;

  font-weight: 900;
}


/* ================= MEMBER INFO ================= */

.member-info h3 {
  margin: 0 0 7px;

  font-size: 22px;

  font-weight: 900;

  color: #222;
}


.member-role {
  display: inline-block;

  color: #d81b60;

  font-size: 13px;

  font-weight: 800;

  margin-bottom: 15px;
}


.member-description {
  color: #666;

  font-size: 14px;

  line-height: 1.7;

  margin: 0 0 22px;
}


/* ================= DRINKS ================= */

.drinks-title {
  font-size: 13px;

  font-weight: 800;

  color: #333;

  margin-bottom: 10px;
}


.drink-list {
  display: flex;

  flex-wrap: wrap;

  gap: 8px;
}


.drink-item {
  display: flex;

  align-items: center;

  gap: 7px;

  padding: 7px 10px;

  border-radius: 10px;

  background: #fdf2f8;

  color: #555;

  font-size: 12px;

  font-weight: 700;

  border: 1px solid #f8bbd0;
}


.drink-icon {
  display: flex;

  align-items: center;

  justify-content: center;

  color: #d81b60;
}


/* ================= CTA ================= */

.cta-section {
  padding: 0 20px 70px;
}


.cta-content {
  max-width: 1160px;

  margin: 0 auto;

  padding: 30px 35px;

  display: flex;

  align-items: center;

  gap: 20px;

  background:
    linear-gradient(
      135deg,
      #fce4ec,
      #f3e5f5
    );

  border: 1px solid #f8bbd0;

  border-radius: 22px;
}


.cta-icon {
  width: 60px;

  height: 60px;

  min-width: 60px;

  border-radius: 16px;

  background: white;

  color: #d81b60;

  display: flex;

  align-items: center;

  justify-content: center;
}


.cta-content h2 {
  margin: 0 0 5px;

  color: #251014;

  font-size: 21px;

  font-weight: 900;
}


.cta-content p {
  margin: 0;

  color: #666;

  font-size: 14px;
}


.cta-button {
  margin-left: auto;

  display: flex;

  align-items: center;

  gap: 8px;

  border: none;

  border-radius: 12px;

  padding: 13px 20px;

  background: #d81b60;

  color: white;

  font-size: 14px;

  font-weight: 800;

  cursor: pointer;

  transition: all 0.2s ease;

  white-space: nowrap;
}


.cta-button:hover {
  background: #c2185b;

  transform: translateY(-2px);

  box-shadow:
    0 7px 18px rgba(216, 27, 96, 0.25);
}


/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

  .team-grid {
    grid-template-columns: 1fr;
  }

  .team-card {
    display: flex;

    gap: 20px;
  }

  .member-avatar {
    min-width: 70px;
  }

}


@media (max-width: 650px) {

  .about-hero {
    padding: 60px 20px;
  }

  .about-hero h1 {
    font-size: 35px;
  }

  .about-hero p {
    font-size: 15px;
  }

  .intro-section {
    padding: 50px 20px;
  }

  .section-title h2 {
    font-size: 27px;
  }

  .team-card {
    display: block;
  }

  .cta-content {
    flex-direction: column;

    text-align: center;

    padding: 30px 20px;
  }

  .cta-button {
    margin-left: 0;
  }

}

</style>

