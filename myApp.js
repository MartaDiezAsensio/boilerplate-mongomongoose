require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect( process.env.MONGO_URI, 
	{ useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log("DB connection successful");
	});

const schema = new Schema( {
	name: {
		type: String,
		required: true
	},
	age: Number,
	favoriteFoods: [String],
});


let Person = mongoose.model('Person', schema);


const createAndSavePerson = (done) => {
	const newPerson = new Person( {
		name: 'Marta',
		age: 23,
		favoriteFoods: ["mango", "banana"]
	});

	newPerson.save(function(err, data) {
		if (err) return console.error(err);
		done(null, data)
	  });
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err)
			return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({name: personName}, (err, data) => {
		if (err)
			return console.error(err);
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, (err, data) => {
		if (err)
			return console.Console.error(err);
		done(null, data);
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, data) => {
		if (err)
			return console.Console.error(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";

	findPersonById(personId, (err, person) => {
		if (err)
			return console.error(err);

		person.favoriteFoods.push(foodToAdd);

		person.save((err, updatedPerson) => {
			if (err)
				return console.error(err);

			done(null, updatedPerson);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	findPeopleByName(personName, (err, person) => {
		if (err)
			return console.error(err);

		person[0].age = ageToSet;
		person[0].save({ new: true }, (err, updatedPerson) => {
			if (err)
				return console.error(err);
			done (null, updatedPerson);
		});
	});
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, removedPerson) => {
		if (err)
			return console.error(err);

		done (null, removedPerson);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	Person.remove({ name: nameToRemove }, (err, peopleRemoved) => {
		if (err)
			return console.error(err);

		done(null, peopleRemoved);
	});
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	Person.find({ favoriteFoods: foodToSearch })
	.sort('name')
	.limit(2)
	.select('-age')
	.exec((err, data) => {
		if (err) {
			return console.error(err);
		}

		done(null, data);
	});
};

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
