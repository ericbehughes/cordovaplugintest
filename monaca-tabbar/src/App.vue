<template>
    <v-ons-page>

        <v-ons-toolbar>
            <div class="left fyd-color-red">
                <v-ons-back-button class="fyd-color-red"></v-ons-back-button>
            </div>
            <div class="center">
                Edit Availability
            </div>
        </v-ons-toolbar>

        <v-ons-list-header>Duration</v-ons-list-header>
        <v-ons-list-item>
            <v-ons-row>
                <v-ons-col>
                    <p class="fyd-text-tiny">From</p>
                    <span @click="showDatepicker('from')" class="fyd-bold fyd-border-bottom-red">{{dateFormatted(duration.fromDate)}}</span>
                </v-ons-col>
                <v-ons-col>
                    <p class="fyd-text-tiny">To</p>
                    <span @click="showDatepicker('to')" class="fyd-bold fyd-border-bottom-red">{{dateFormatted(duration.toDate)}}</span>
                </v-ons-col>
            </v-ons-row>
        </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
// Onsen UI styling and icons
import 'onsenui/css-components-src/src/onsen-css-components.css';
import 'onsenui/css/onsenui.css';

// FYD styling
import './css/fyd-onsenui.css';
import './css/fyd-shared.css';


export default {
    data() {
        return {
            colors: [
                { name: 'Blue', class: 'fyd-color-availability-blue' },
                { name: 'Green', class: 'fyd-color-availability-green' },
                { name: 'Pink', class: 'fyd-color-availability-pink' },
                { name: 'Red', class: 'fyd-color-availability-red' },
                { name: 'Yellow', class: 'fyd-color-availability-yellow' }
            ],
            days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            title: 'My Standard Week',
            availabilities: [{
                days: [1, 2, 3, 4, 5],
                fromTime: '8:00',
                toTime: '17:00'
            }, {
                days: [0, 6],
                fromTime: '9:00',
                toTime: '13:00'
            }],
            duration: {
                fromDate: moment().toDate(),
                toDate: moment().add(1, 'month').toDate()
            },
            rate: 32,
            locations: [{
                name: "LA Fitness",
                isChecked: true
            }, {
                name: "Golds Gym",
                isChecked: false
            }, {
                name: "Pro Gym",
                isChecked: true
            }],
            audience: [{
                name: "Men",
                isChecked: true
            }, {
                name: "Woman",
                isChecked: false
            }, {
                name: "Other",
                isChecked: false
            }],
            ageRange: [33, 44],
            groupsOf: [{
                name: "1",
                isChecked: true,
            }, {
                name: "2",
                isChecked: false
            }, {
                name: "3+",
                isChecked: false
            }],
            color: { name: 'Blue', class: 'fyd-color-availability-blue' },
            colorModalVisible: false
        };
    },
    props: ['stack'],
    methods: {
        dayModifier(availability, dayIdx) {
            return _.includes(availability.days, dayIdx) ? 'fyd-active' : '';
        },
        toggleActiveDays(availability, dayIdx) {
            var indexOfDay = _.indexOf(availability.days, dayIdx);
            if (indexOfDay === -1)
                availability.days.push(dayIdx);
            else
                availability.days.splice(indexOfDay, 1);
        },
        showTimepicker(target, availability) {

            var dateTime;
            if (target == 'from') {
                dateTime = moment(availability.fromTime, "HH:mm").toDate();
            }
            else if (target == 'to') {
                dateTime = moment(availability.toTime, "HH:mm").toDate();
            }

            window.plugins.datePicker.show({
                date: dateTime,
                mode: 'time',    // date or time or blank for both
                allowOldDates: false
            }, function(returnDate) {
                if (target == 'from') {
                    availability.fromTime = moment(returnDate).format('HH:mm');
                }
                else if (target == 'to') {
                    availability.toTime = moment(returnDate).format('HH:mm');
                }
            });
        },
        showDatepicker(target) {

            // Save instance reference
            var self = this;

            // Get current date
            var oldDate;
            switch (target) {
                case 'from':
                    oldDate = self.duration.fromDate;
                    break;
                case 'to':
                    oldDate = self.duration.toDate;
                    break;
            }

            // Display date picker
            window.plugins.datePicker.show({
                date: oldDate,
                mode: 'date',
                allowOldDates: true
            }, function(returnDate) {

                // Set new date
                switch (target) {
                    case 'from':
                        self.duration.fromDate = moment(returnDate).toDate();
                        break;
                    case 'to':
                        self.duration.toDate = moment(returnDate).toDate();
                        break;
                }
            });
        },
        dateFormatted(value) {
            return moment(value).format("MM-DD-YYYY");
        },
        showColorModal() {
            this.colorModalVisible = true;
        },
        setColor(color) {
            this.color = color;
            this.colorModalVisible = false;
        }
    }
}
</script>