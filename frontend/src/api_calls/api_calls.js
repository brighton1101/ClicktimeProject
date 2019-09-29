exports.get_data = async () => {
    let response = await fetch('http://localhost:3000/movies');
    let data = await response.json();
    return data;
};

exports.get_images = async() => {
    let response = await fetch('http://localhost:3000/movies/images');
    let images = await response.json();
    return images;
};