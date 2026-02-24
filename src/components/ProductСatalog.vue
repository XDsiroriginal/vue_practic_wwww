<script setup>

  import axios from "axios";
  import {ref, onMounted, computed} from 'vue'

  import store from "@/store";

  const items = ref([])

  const fetchData = async () => {
    try {
      const response = await axios.get("http://lifestealer86.ru/api-shop/products");

      items.value = response.data.data;

    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
    console.log('Товары (копия):', JSON.parse(JSON.stringify(items.value)));
  }

  const fio = computed(() => store.getters.fio || 'no authenticate ')
  const email = computed(() => store.getters.email || 'no authenticate')

  onMounted(() => {
    fetchData();

    console.log('--- Store State ---');
    console.log('Token:', store.state.token);
    console.log('User Object:', store.state.user);

    console.log('--- Store Getters ---');
    console.log('Fio Getter:', store.getters.fio);
    console.log('Email Getter:', store.getters.email); // Будет undefined, так как закомментировано

    console.log('--- LocalStorage ---');
    console.log('LS Token:', localStorage.getItem('myAppToken'));
    console.log('LS User:', localStorage.getItem('userData'));

    console.log('Полный объект пользователя из store:', store.state.user);
    console.log('Все данные store:', store.state);
  });


</script>

<template>

  <header class="header">
    <div class="header-container">
      <div class="user-info">
        <span class="user-fio">Фио: {{ fio }}</span>
        <span class="user-email">email: {{ email }}</span>
      </div>

      <button class="logout-btn" @click="logoutHandler">
        Выйти из аккаунта
      </button>
    </div>
  </header>

  <div class="catalog">
    <div class="cart" v-for="cart in items">
      <h3 class="cart-name">{{ cart.name }}</h3>
      <img :src="'http://lifestealer86.ru/' + cart.image" :alt="cart.name" class="cart-image">
      <p class="cart-description">{{ cart.description }}</p>
      <div class="down_panel">
        <p class="price">{{ cart.price }}</p>
        <button v-show="store.getters.isAuthenticated" class="add-to-cart">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .header {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
  }

  .header-container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .user-fio {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2c3e50;
  }

  .user-email {
    font-size: 0.9rem;
    color: #666;
  }

  .logout-btn {
    padding: 8px 20px;
    background-color: transparent;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .logout-btn:hover {
    background-color: #e74c3c;
    color: #fff;
    transform: translateY(-2px);
  }


  .down_panel {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .add-to-cart {
    width: 150px;
    height: 40px;
    background-color: cadetblue;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
    transition: 0.3s;
  }

  .add-to-cart:hover {
    background-color: #497a7b;
    transition: 0.3s;
  }

  .catalog {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .cart {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .cart:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .cart-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    background-color: #eee;
  }

  .cart-name {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 20px 20px 10px;
    line-height: 1.3;
  }

  .cart-description {
    font-size: 0.95rem;
    color: #666;
    margin: 0 20px 20px;
    line-height: 1.5;
    flex-grow: 1;
    overflow: hidden;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 20px 25px;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>