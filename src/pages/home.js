import { defineComp, renderApp } from "../../node_modules/keywall/dist/lib";
import Button from "../components/button.js";

function App() {
    return defineComp({
        html: 
        /* HTML */`
            <button class="title-container">
                <h1>Keywall</h1>
            </button>
            <section>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sit, a hic nihil ducimus tempora vel quam commodi id amet perferendis. Voluptates, atque sint illum delectus fugiat culpa magnam dolore maiores odio est facilis corporis rerum sed dignissimos! Quae nesciunt quas distinctio quia fugit quo porro esse ea nemo fuga.
            </section>
                ${Button({ cta: 'Click Me' })}

            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    padding: 0;
                    margin: 0;
                    font-family: sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: lightgray;
                    height: 100vh;
                }
                #app {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                h1 {
                    color: white;
                }
                .title-container {
                    background-color: firebrick;
                    width: fit-content;
                    padding: .6rem 2rem;
                    border-radius: 3px;
                    box-shadow:
                    -1px -1px 1px rgba(255,0,0,1.85),
                    0 0 2px rgba(0,0,0,.85),
                    0 0 3px rgba(0,0,0,.55),
                    0 0 8px rgba(0,0,0,.35),
                    14px 14px 28px rgba(0,0,0,.55);
                    transform: rotate(2deg);
                    margin-bottom: 5rem;
                    cursor: pointer;
                    border: none;
                }
                .title-container:active {
                    background-color: blue;
                }
                section {
                    width: 50vw;
                }
            </style>
        `,
    })
}

renderApp('app', App());
