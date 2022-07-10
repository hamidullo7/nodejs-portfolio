
export default function Waiter(props) {
    return (
        <div style={{display: props.show ? 'block' : 'none', zIndex: 15000}} >
            <div class="loader-wrapper1">
                <div class="loader1"></div>
            </div>
        </div>
    )
}
