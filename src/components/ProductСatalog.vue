<script setup>

  const items = ref([])

  import axios from "axios";
  const fetchData = async () => {
    const response = await axios.get("http://lifestealer86.ru/api-shop/products");
    items.value = response.data;
    console.log(items);
  }

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <div class="catalog">
    <div class="cart">
      <h3 class="cart-name"></h3>
      <img src="" alt="" class="cart-image">
      <p class="cart-description"></p>
      <p class="price"></p>
    </div>
  </div>
</template>

<style scoped>
  .catalog {
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