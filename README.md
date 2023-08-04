# Bookworm - A Book Lover's Matching App

Bookworm is a personal project for my portfolio, and it's a unique social app designed for book lovers, where users can find and connect with others who share similar interests in books. Instead of swiping right for dates, you swipe right for literary discussions!

### Introduction

Welcome to Bookworm! This app aims to create a vibrant community of book enthusiasts by connecting like-minded readers together. You can discover people with the same favorite books, genres, books they are currently reading, and books on their bucket list. Engage in meaningful conversations, share your literary experiences, and explore new reading recommendations.

**Note**: Bookworm is still under development and has not been deployed to any public servers.

### Features

- User registration and authentication using JWT tokens.
- Create and update your profile with favorite books, genres, currently reading, and bucket list books.
- Swipe through book profiles and match with users who share similar book interests.
- Real-time chat feature to connect with your book matches.

### Technologies Used

- Django: Backend development using the powerful and flexible Django web framework.
- React Native: Frontend development with the popular and cross-platform mobile framework.
- JWT: JSON Web Tokens for secure user authentication and authorization.
- SQLite: Database management system to store user data and book information.

### Installation

To run the Bookworm app on your local machine, follow these steps:

- Clone the repository: `git clone https://github.com/sidd3103/bookworm.git`
- Install backend dependencies: `cd bookworm && pip install -r requirements.txt`
- Configure backend settings: Update the database credentials and JWT secret key in settings.py.
- Run database migrations: `python manage.py makemigrations && python manage.py migrate`
- Start the backend server: python manage.py runserver

For the React Native frontend:

- Install frontend dependencies: `cd bookworm/frontend && npm install`
- Start the frontend development server: `npm start`


In `node_modules/react-native-deck-swiper`, change 
```
resetPanAndScale = () => {
    const {previousCardDefaultPositionX, previousCardDefaultPositionY} = this.props
    this.state.pan.setValue({ x: 0, y: 0 }) 
    this.state.previousCardX.setValue(previousCardDefaultPositionX)
    this.state.previousCardY.setValue(previousCardDefaultPositionY)
}
```
to 
```
resetPanAndScale = () => {
    const {previousCardDefaultPositionX, previousCardDefaultPositionY} = this.props
    this.state.pan.setValue({ x: 0, y: 0 })
    this.state.pan.setOffset({ x: 0, y: 0})
    this._animatedValueX = 0
    this._animatedValueY = 0
    this.state.previousCardX.setValue(previousCardDefaultPositionX)
    this.state.previousCardY.setValue(previousCardDefaultPositionY)
    this.state.pan.x.addListener(value => this._animatedValueX = value.value)
    this.state.pan.y.addListener(value => this._animatedValueY = value.value)
}
```

### Contributing

We welcome contributions to make Bookworm even better for the book lover community. If you find any bugs, have feature suggestions, or want to contribute in any other way, please submit an issue or open a pull request.

### License

Bookworm is open-source software licensed under the MIT License. Feel free to use, modify, and distribute the code for your own purposes.

***

Happy reading and connecting with Bookworm! If you have any questions or need assistance, don't hesitate to contact me at siddharth.mittal31@gmail.com. Please keep in mind that this app is still a work in progress and not yet ready for public deployment.





