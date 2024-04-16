const express = require('express');
const path = require('path');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const getAbsolutePath = (relativePath) => path.join(process.cwd(), relativePath);



const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', __dirname);
const session = require('express-session');
app.use(session({
    secret: '56',
    resave: false,
    saveUninitialized: true
}));


// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/styles.css', express.static(path.join(__dirname, '..', 'styles.css')));
app.use('/photos', express.static(path.join(__dirname, '..', 'photos')));
app.use('/contactus.html', express.static(path.join(__dirname, '..', 'contactus.html')));
app.use('/index.html', express.static(path.join(__dirname, '..', 'index.html')));
app.use('/index.ejs', express.static(path.join(__dirname, '..', 'index.ejs')));
app.use('/login.html', express.static(path.join(__dirname, '..', 'login.html')));
app.use('/register.html', express.static(path.join(__dirname, '..', 'register.html')));
app.use('/register.css', express.static(path.join(__dirname, '..', 'register.css')));
app.use('/admindashboard.html', express.static(path.join(__dirname, '..', 'admindashboard.html')));
app.use('/change-pass.html', express.static(path.join(__dirname, '..', 'change-pass.html')));
app.use('/change-pass.css', express.static(path.join(__dirname, '..', 'change-pass.css')));
app.use('/404pagenotfound.html', express.static(path.join(__dirname, '..', '404pagenotfound.html')));
app.use('/about.html', express.static(path.join(__dirname, '..', 'about.html')));
app.use('/about.css', express.static(path.join(__dirname, '..', 'about.css')));
app.use('/booking.css', express.static(path.join(__dirname, '..', 'booking.css')));
app.use('/bookingpagee.html', express.static(path.join(__dirname, '..', 'bookingpagee.html')));
app.use('/edit-profile.html', express.static(path.join(__dirname, '..', 'edit-profile.html')));
app.use('/edit-profile.css', express.static(path.join(__dirname, '..', 'edit-profile.css')));
app.use('/edit-profile.js', express.static(path.join(__dirname, '..', 'edit-profile.js')));
app.use('/map.html', express.static(path.join(__dirname, '..', 'map.html')));
app.use('/map.css', express.static(path.join(__dirname, '..', 'map.css')));
app.use('/map.js', express.static(path.join(__dirname, '..', 'map.js')));
app.use('/payment.html', express.static(path.join(__dirname, '..', 'payment.html')));
app.use('/profile.html', express.static(path.join(__dirname, '..', 'profile.html')));
app.use('/profile.css', express.static(path.join(__dirname, '..', 'profile.css')));
app.use('/review_rate.html', express.static(path.join(__dirname, '..', 'review_rate.html')));
app.use('/search-result.html', express.static(path.join(__dirname, '..', 'search-result.html')));
app.use('/search-result.css', express.static(path.join(__dirname, '..', 'search-result.css')));
app.use('/terms.html', express.static(path.join(__dirname, '..', 'terms.html')));
app.use('/user-detail.html', express.static(path.join(__dirname, '..', 'user-detail.html')));
app.use('/coreTeam.html', express.static(path.join(__dirname, '..', 'coreTeam.html')));
app.use('/confirmpayment.html',express.static(path.join(__dirname, '..', 'confirmpayment.html')))
app.use('/bookedslot.html', express.static(path.join(__dirname, '..', 'bookedslot.html')));
app.use('/parkingarea.html', express.static(path.join(__dirname, '..', 'parkingarea.html')));


// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Khushi@9876',
    database: 'myapp'
});


// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});



// Serve the registration form
app.get('/register', (req, res) => {
    res.sendFile(__dirname ,'..', '/register.html');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    connection.query(sql, [username, password, email], (err, result) => {
        if (err) {
            console.error('Error registering user: ' + err.message);
            res.send('Error registering user.');
        } else {
            console.log('User registered with ID ' + result.insertId);
            res.send('Registration successful! You can now <a href="/login.html">login</a>.');
        }
    });
});


// Serve the login form
// app.get('/login', (req, res) => {
//     res.sendFile(__dirname ,'..','/login.html');
// });


// Handle login form submission for admin
// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if the username and password match the admin credentials
    if (username === 'Admin' && password === 'Admin@123') {
        // Redirect to the admin dashboard if the credentials are correct
        res.redirect('/admindashboard.html');
    } else {
        // Redirect to the user profile if the credentials are correct
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
        connection.query(sql, [username, password], (err, result) => {
            if (err) {
                console.error('Error logging in: ' + err.message);
                res.send('Error logging in.');
            } else {
                if (result.length > 0) {
                    // User found, redirect to profile page
                    res.cookie('loggedInUser', username, { maxAge: 900000, httpOnly: true });
                    res.redirect('/profile.html');
                } else {
                    // User not found, show error message
                    res.redirect('/login?error=1');
                }
            }
        });
    }
});

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'admindashboard.html'));
});

// Serve the login.html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
});




// Serve the index.html file at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});







app.post('/submit-review', (req, res) => {
    const { username, rating, review } = req.body;
    if (!review) {
        console.error('Review cannot be null');
        res.status(400).send('Review cannot be null');
        return;
    }

    const sql = 'INSERT INTO reviews (username, rating, review) VALUES (?, ?, ?)';
    connection.query(sql, [username, rating, review], (err, result) => {
        if (err) {
            console.error('Error storing review:', err);
            res.status(500).send('Error storing review');
            return;
        }
        console.log('Review stored successfully:', result);
        res.redirect('/'); // Redirect to the homepage after storing the review
    });
});

// Serve the index.html file at the root path
// Serve the index.html file at the root path
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM reviews';
    connection.query(sql, (err, reviews) => {
        if (err) {
            console.error('Error fetching reviews:', err);
            res.status(500).send('Error fetching reviews');
            return;
        }
        res.render('index', { reviews });
    });
});





// Serve the edit-profile.html file
app.get('/edit-profile', (req, res) => {
    const username = req.cookies.loggedInUser;
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.length > 0) {
            const user = results[0];
            res.sendFile(path.join(__dirname, '..', 'edit-profile.html'));
        } else {
            // User not found, handle accordingly
            res.status(404).send('User not found');
        }
    });
});

// Update the user profile
app.post('/edit-profile', (req, res) => {
    const { username, newUsername, email, password } = req.body;
    connection.query(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE username = ?',
        [newUsername, email, password, username],
        (error, results) => {
            if (error) {
                console.error('Error updating user profile:', error);
                res.status(500).send('Error updating user profile');
                return;
            }
            console.log('User profile updated successfully:', results);
            res.redirect('/profile.html'); // Redirect to the profile page
        }
    );
});









// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});