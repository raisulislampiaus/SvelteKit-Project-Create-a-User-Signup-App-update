<script>
  export let value;
</script>

<div class="gender-group">
  <div class="input">
    Female<input type="radio" bind:group={value} value="female" /> 
  </div>

  <div class="input">
    Male<input type="radio" bind:group={value} value="male" /> 
  </div>

  <div class="input">
    Custom<input type="radio" bind:group={value} value="custom" /> 
  </div>
</div>

<style>
  .gender-group {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
