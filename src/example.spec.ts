// class FriendsList {
//   friends = [];

//   addFriend(name: string) {
//     this.friends.push(name);
//     this.announceFriendShip(name);
//   }

//   announceFriendShip(name: string) {
//     console.log(`Friend ${name} have been added to the list`);
//   }

//   removeFriendShip(name: any): void {
//     const idx = this.friends.findIndex((val) => val === name);
//     if (idx === -1) {
//       throw new Error('Friend not found!');
//     }

//     this.friends.splice(idx, 1);
//   }
// }

// describe('FriendsList', () => {
//   let friendsList;

//   beforeEach(() => {
//     friendsList = new FriendsList();
//   });

//   it('Should have a friend', () => {
//     friendsList.announceFriendShip = jest.fn();
//     expect(friendsList.announceFriendShip).not.toBeCalled();
//     friendsList.addFriend('Qoyyum');
//     expect(friendsList.friends.length).toBe(1);
//     expect(friendsList.announceFriendShip).toBeCalledWith('Qoyyum');
//   });

//   it('Should not have a friend', () => {
//     expect(friendsList.friends.length).toBe(0);
//   });

//   describe('Remove Friendship', () => {
//     it('Should remove a friend', () => {
//       friendsList.addFriend('Qoyyum');
//       friendsList.removeFriendShip('Qoyyum');
//       expect(friendsList.friends.length).toBe(0);
//     });

//     it('Should throw an error', () => {
//       expect(() => friendsList.removeFriendShip('Qoyyum')).toThrow(
//         new Error('Friend not found!'),
//       );
//     });
//   });
// });
