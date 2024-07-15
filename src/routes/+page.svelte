<script>
  import DateOfBirth from "$lib/components/DateOfBirth.svelte";
  import Gender from "$lib/components/Gender.svelte";

  let firstName = "";
  let surname = "";
  let emailOrMobile = "";
  let password = "";
  let dateOfBirth = { day: "", month: "", year: "" };
  let gender = "";
  let errors = {};

  // const handleSubmit = async () => {
  //   errors = {};
  //   if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
  //     errors.dateOfBirth = "Invalid Date, please select a valid date";
  //   }
  //   if (!gender) {
  //     errors.gender = "Gender is required.";
  //   }

  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const res = await fetch("/api/signup", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           firstName,
  //           surname,
  //           emailOrMobile,
  //           password,
  //           dateOfBirth,
  //           gender,
  //         }),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) {
  //         throw new Error(data.message || "Signup failed");
  //       }
  //       alert("Signup successful!");
  //     } catch (err) {
  //       if (err.message.includes("email") || err.message.includes("mobile")) {
  //         errors.backend = err.message;
  //       } else {
  //         console.error(err);
  //       }
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    errors = {};
    if (!dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year) {
      errors.dateOfBirth = "Invalid Date, please select a valid date";
    }
    if (!gender) {
      errors.gender = "Gender is required.";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const res = await fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            surname,
            emailOrMobile,
            password,
            dateOfBirth,
            gender,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Signup failed");
        }
        alert("Signup successful!");
      } catch (err) {
        if (
          err.message.includes("Email or mobile number already exists") ||
          err.message.includes("Invalid email or mobile number")
        ) {
          errors.backend = err.message;
        } else {
          console.error(err);
        }
      }
    }
  };
</script>

<div class="form-container">
  <h2>Sign Up</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-row">
      <div class="form-group">
        <input
          placeholder="First Name"
          bind:value={firstName}
          type="text"
          required
        />
      </div>
      <div class="form-group">
        <input
          placeholder="Surname"
          bind:value={surname}
          type="text"
          required
        />
      </div>
    </div>
    <div class="form-group">
      <input
        placeholder="Enter Mobile number or email address"
        bind:value={emailOrMobile}
        type="text"
        required
      />
      {#if errors.backend}
        <div class="new">
          <div class="error">{errors.backend}</div>
        </div>
      {/if}
    </div>
    <div class="form-group">
      <input
        placeholder="Password must be at least 4 chars long"
        bind:value={password}
        type="password"
        required
        minlength="4"
      />
    </div>
    <div class="form-group">
      <label>Date Of Birth</label>
      <DateOfBirth bind:dateOfBirth />
      {#if errors.dateOfBirth}
        <div class="new">
          <div class="error">{errors.dateOfBirth}</div>
        </div>
      {/if}
    </div>
    <div class="form-group">
      <label
        >Please choose a gender. You can change who can see this later</label
      >
      <Gender bind:value={gender} />
      {#if errors.gender}
        <div class="new">
          <div class="error">{errors.gender}</div>
        </div>
      {/if}
    </div>
    <div class="button-row">
      <button type="submit">Sign Up</button>
      <button type="button">Cancel</button>
    </div>
  </form>
</div>

<style>
  .form-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-row {
    display: flex;
    gap: 20px;
  }
  .form-row .form-group {
    flex: 1;
    margin-right: 10px;
  }
  .form-row .form-group:last-child {
    margin-right: 0;
  }
  input,
  select {
    width: 100%;
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
  .dob-group,
  .gender-group {
    display: flex;
    justify-content: space-between;
  }
  .dob-group select,
  .gender-group label {
    flex: 1;
  }
  .gender-group label {
    display: flex;
    align-items: center;
  }
  .gender-group input {
    margin-right: 5px;
  }
  .button-row {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button[type="submit"] {
    background-color: #4caf50;
    color: white;
  }
  button[type="button"] {
    background-color: #f44336;
    color: white;
  }
  .new {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
