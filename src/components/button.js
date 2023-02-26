import { defineComp } from "node_modules/keywall/dist/lib";

function Button({ cta }) {
    return defineComp({
        html: /* HTML */`
        <button onclick="test()">${ cta }</button>
        `,
        methods: {
            test() {
                console.log('test');
            }
        },
        style: /*CSS */`
        button {
            padding: 1rem 2rem;
        }`,
    })
};

export default Button;
