import { defineComp } from "../../node_modules/keywall/dist/lib";

function Button({ cta }) {
    return defineComp({
        html: /* HTML */`
        <button onclick="handleClick()">${ cta }</button>
        <style>
            button {
                background-color: firebrick;
                color: white;
                width: fit-content;
                padding: .6rem 2rem;
                border-radius: 3px;
                box-shadow:
                -1px -1px 1px rgba(255,0,0,1.85),
                0 0 2px rgba(0,0,0,.85),
                0 0 3px rgba(0,0,0,.55),
                0 0 8px rgba(0,0,0,.35),
                14px 14px 28px rgba(0,0,0,.55);
                transform: rotate(-2deg);
                margin-bottom: 5rem;
                cursor: pointer;
                border: none;
            }
        </style>
        <script>
            function handleClick() {
                alert('Hello from KeyWall');
            }
        </script>
        `,
    })
};

export default Button;
