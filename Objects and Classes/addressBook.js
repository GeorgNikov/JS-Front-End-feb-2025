function addressBookManager(arrayOfStrings) {
    let addressBook = {};

    arrayOfStrings.forEach(entry => {
        let [name, address] = entry.split(':')
        addressBook[name] = address;
    });

    let sortedAddressBook = Object.fromEntries(
        Object.entries(addressBook).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    );

    for (let name in sortedAddressBook) {
        console.log(`${name} -> ${sortedAddressBook[name]}`);
    }
}