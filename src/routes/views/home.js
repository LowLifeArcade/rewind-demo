import { defineComp, renderApp } from "node_modules/keywall/dist/lib";
import Button from "~/components/button";

function App() {
    return defineComp({
        html: /* HTML */`
            <h1>Home</h1>
            <section>
            ${Button({ cta: 'Click Me' })}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus animi officia tenetur! Nulla, dolores deleniti vel rerum repellendus sequi totam doloremque ex iste eaque et? Laborum facilis sapiente rem harum laboriosam voluptatibus! Ullam doloremque labore ut, inventore provident aut eius dicta optio eos ipsam temporibus, omnis corrupti quam quaerat incidunt.
            </section>
        `,
        style: /* CSS */`
            section {
                background-color: gray;
            }
         `,
    })
}

renderApp('app', App());