<script lang="ts">
    import { studentId } from "$lib/stores";
    import Main from "./Main.svelte";

    let studentIdInput: number;

    function onSubmit() {
        $studentId = studentIdInput;
    }
</script>

<Main>
    <h3 class="text-center mt-36">Welcome to Marks Xchange!</h3>
    <div class="flex items-center border-b border-teal-500 py-2 w-2/3 justify-center mx-auto">
        <input
            class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            placeholder="Your Student ID"
            bind:value={studentIdInput}
        />
        <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            on:click={onSubmit}
        >
            Submit
        </button>
    </div>
</Main>
