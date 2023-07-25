<script>
  let expression = "";
  let result = "";

  const calculate = async () => {
    const response = await fetch("http://localhost:5173/api/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ expression })
    });

    result = await response.json();
    expression = result; // Display the result in the input box
  };

  const appendToExpression = (value) => {
  if (result !== "") {
    // If the user clicks an operation after the result is shown, reset the result box and start a new expression
    expression = result + value;
    result = "";
  } else {
    // Otherwise, continue appending to the existing expression
    expression += value;
  }
};


  const clearExpression = () => {
    expression = "";
    result = "";
  };
</script>

<main style="text-align:center;">
  <h1>Canlas - Calculator</h1>
  <input id="resultbox" type="text" bind:value={expression} />

  <div class="buttons">
    <button on:click={() => appendToExpression("1")}>1</button>
    <button on:click={() => appendToExpression("2")}>2</button>
    <button on:click={() => appendToExpression("3")}>3</button>
    <button on:click={clearExpression}>Clear</button>
    <br />
    <button on:click={() => appendToExpression("4")}>4</button>
    <button on:click={() => appendToExpression("5")}>5</button>
    <button on:click={() => appendToExpression("6")}>6</button>
    <button on:click={() => appendToExpression("+")}>+</button>
    <br />
    <button on:click={() => appendToExpression("7")}>7</button>
    <button on:click={() => appendToExpression("8")}>8</button>
    <button on:click={() => appendToExpression("9")}>9</button>
    <button on:click={() => appendToExpression("-")}>-</button>
    <br />
    <button on:click={() => appendToExpression("0")}>0</button>
    <button on:click={() => appendToExpression(".")}>.</button>
    <button on:click={() => appendToExpression("*")}>*</button>
    <button on:click={() => appendToExpression("/")}>/</button>
    <br />
    <button on:click={calculate} style="margin-top:5px;width:215px">Calculate</button>
  </div>
</main>

<style>
  /* Styles for buttons and other elements */
  #resultbox {
    height: 36px;
    width: 206px;
  }
  .buttons {
    margin-top: 5px;
  }
  button {
    width: 50px;
    height: 50px;
  }
</style>
