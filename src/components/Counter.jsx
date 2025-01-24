import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../../app/counterSlice.js";

export const Counter = () => {
    const [count, setCount] = useState(0)
    const reduxCount = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <>
            <h3>useState counter:</h3>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <br/>
            <div><h3>redux counter:</h3>
                <div>
                    <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </button>
                    <span>{reduxCount}</span>
                    <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </button>
                </div>
            </div>
        </>
    );
};