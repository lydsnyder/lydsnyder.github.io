<template>
  <div id="app" class="wrapper">
    <div class="sidebar">
      <div class="logo">
        <a href="#" class="simple-text">Christmas</a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li v-for="member in members">
            <a href="#" @click="changeActiveMember(member)"><i class="material-icons">person</i> <p>{{ member.name }}</p></a>
          </li>
          <li class="active-pro">
            <a href="#" @click="showNewMemberModal"><i class="material-icons">person_add</i> New Member</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="main-panel">
      <div class="content">
        <div class="container-fluid">
          <!-- If there is an active member -->
          <div v-if="activeMember">
            <h1>{{activeMember.name}} Christmas List</h1>
            <div class="row">
              <!-- Active Member Data -->
              <div class="card">
                <div class="card-header" data-background-color="green">
                  <h2>Gifts</h2>
                </div>
                <div class="card-content table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <td>
                          Claimed
                        </td>
                        <td>
                          Gift
                        </td>
                        <td>
                          Claimee
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="gift in activeMember.gifts">
                        <td>
                          <input type="checkbox" v-model="gift.claimed" />
                        </td>
                        <td>
                          {{ gift.name }}
                        </td>
                        <td>
                          <input type="text" v-model="gift.claimee" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-footer">
                  <button type="button" class="btn btn-success" @click="saveMemberData(activeMember)">Submit</button>
                </div>
              </div>
            </div>
          </div>

          <!-- If there is no active member -->
          <div v-if="!activeMember">
            <div class="jumbotron">
              <h1>Welcome to the Christmas List app!</h1>
              <h2>Select someone on the left to see their Christmas list</h2>
            </div>
          </div>

          <!-- New Member Modal -->
          <sweet-modal title="Add a new family member" ref="newMemberModal">
            <form id="form" class="form-inline" v-on:submit.prevent="addMember">
              <div class="form-group">
                <label for="memberName">Name:</label>
                <input type="text" id="memberName" class="form-control" v-model="newMember.name" />
              </div><br />
              <div class="form-group" v-for="gift in newMember.gifts">
                <label>Gift: </label>
                <input type="text" v-model="gift.name" />
              </div>
              <button type="button" v-on:click="addGift(gift)"><i class="material-icons">add</i></button>
              <input type="submit" class="btn btn-primary" value="Add Member" />
            </form>
            <sweet-button slot="button">Add</sweet-button>
          </sweet-modal>
        </div>
      </div>

      <!-- Current Members -->
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3>Members List</h3>
        </div>
        <div class="panel-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>
                  Member
                </th>
                <th>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in members">
                <td>
                  {{ member.name }}
                </td>
                <td>
                  <span v-on:click="removeMember(member)"><i class="material-icons">delete</i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

import Firebase from 'firebase'

import toastr from 'toastr'

import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

let config = {
  apiKey: "AIzaSyCsMmS7TtPL8BHRCQPvfgINmCk3b4KNdrc",
  authDomain: "christmas-a14ca.firebaseapp.com",
  databaseURL: "https://christmas-a14ca.firebaseio.com",
  projectId: "christmas-a14ca",
  storageBucket: "christmas-a14ca.appspot.com",
  messagingSenderId: "212981809423"
}

let app = Firebase.initializeApp(config);
let db = app.database();

let membersRef = db.ref('members');

export default {
  name: 'app',
  firebase: {
    members: membersRef
  },
  components: {
    SweetModal,
    SweetModalTab
  },
  data () {
    return {
      newMember: {
        name: '',
        gifts: []
      },
      activeMember: null
    }
  },
  methods: {
    changeActiveMember: function(member) {
      this.activeMember = member;
    },
    addMember: function() {
      membersRef.push(this.newMember)
      this.newMember.name = '';
      this.newMember.gifts = [];
    },
    removeMember: function(member) {
      membersRef.child(member['.key']).remove();
      toastr.success("Member removed");
    },
    addGift: function(gift) {
      this.newMember.gifts.push({
        name: '',
        claimed: false,
        claimee: ""
      })
    },
    showNewMemberModal: function() {
      this.$refs.newMemberModal.open()
    },
    saveMemberData: function(member) {
      var data = {
        name: member.name,
        gifts: member.gifts
      };
      var updates = {};
      updates[member['.key']] = data;
      membersRef.update(updates);
      toastr.success("List update saved");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
