<script>
  export let dateOfBirth = { day: '', month: '', year: '' };
  let error = '';

  function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day); // month is 0-based
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }

  $: {
    if (dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
      if (!isValidDate(dateOfBirth.day, dateOfBirth.month, dateOfBirth.year)) {
        error = 'Invalid Date, please select a valid date';
      } else {
        error = '';
      }
    }
  }
</script>

<style>
  .dob-group {
    display: flex;
    justify-content: space-between;
  }
  select {
    width: calc(33% - 10px);
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .error {
    width: 50%;
    color: red;
    font-size: 0.9em;
    border: 1px solid red;
    border-radius: 4px;
    padding: 5px;
    text-align: center;
  }
  .new {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="dob-group">
  <select bind:value={dateOfBirth.day}>
    <option value="" disabled>Day</option>
    {#each Array(31).fill(0).map((_, i) => i + 1) as day}
      <option value={day}>{day}</option>
    {/each}
  </select>
  <select bind:value={dateOfBirth.month}>
    <option value="" disabled>Month</option>
    <option value="1">Jan</option>
    <option value="2">Feb</option>
    <option value="3">Mar</option>
    <option value="4">Apr</option>
    <option value="5">May</option>
    <option value="6">Jun</option>
    <option value="7">Jul</option>
    <option value="8">Aug</option>
    <option value="9">Sep</option>
    <option value="10">Oct</option>
    <option value="11">Nov</option>
    <option value="12">Dec</option>
  </select>
  <select bind:value={dateOfBirth.year}>
    <option value="" disabled>Year</option>
    {#each Array(new Date().getFullYear() - 1900).fill(0).map((_, i) => i + 1900) as year}
      <option value={year}>{year}</option>
    {/each}
  </select>
</div>
{#if error}
  <div class="new">
    <p class="error">{error}</p>
  </div>
{/if}
