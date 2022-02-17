import { useState } from "react";

export default function MovieForm({ handleSubmit }) {
    const [movie, setMovie] = useState({ title: '', description: '', runtimeMins: 60 });

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(movie);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: name === 'runtimeMins' ? parseInt(value) : value
        });
    }

    return (
        <form onSubmit={handleSubmitDecorator}>
            <h1>Create A Movie</h1>
            <input type='text' name='title' placeholder="Title" value={movie.title} onChange={handleChange} />
            <input type='text' name='description' placeholder="Description" value={movie.description} onChange={handleChange} />
            <input type='number' name='runtimeMins' placeholder="Runtime (minutes)" value={movie.runtimeMins} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}