const players = [
  { name: "Andre", technical: 5, physical: 7, tactical: 6 },
  { name: "Cacá", technical: 5, physical: 7, tactical: 7 },
  { name: "Estevão", technical: 4, physical: 7, tactical: 7 },
  { name: "Brunão", technical: 4, physical: 8, tactical: 7 },
  { name: "Marcio", technical: 4, physical: 4, tactical: 4 },
  { name: "Fidelis", technical: 3, physical: 4, tactical: 4 },
  { name: "Crispim", technical: 4, physical: 6, tactical: 8 },
  { name: "Jose", technical: 2, physical: 3, tactical: 5 },
  { name: "Paschoa", technical: 6, physical: 6, tactical: 6 },
  { name: "Gusttavo", technical: 9, physical: 8, tactical: 8 },
  { name: "Thyago", technical: 5, physical: 6, tactical: 5 },
  { name: "Marcello", technical: 7, physical: 7, tactical: 7 },
  { name: "Eduardo", technical: 7, physical: 7, tactical: 6 },
  { name: "Nego", technical: 5, physical: 6, tactical: 5 },
  { name: "João Vitor", technical: 9, physical: 8, tactical: 8 },
  { name: "Victor", technical: 7, physical: 8, tactical: 9 },
  { name: "Johnny", technical: 7, physical: 5, tactical: 5 },
];

const getPlayerFinalRating = player => ({
  name: player.name,
  rating: Math.floor(
    (player.technical * 2 + player.physical * 3 + player.tactical) / 3
  ),
});

const playersRating = players.map(getPlayerFinalRating);

function groupPlayersByRating(players) {
  // Group players by rating
  const groupedPlayers = {};
  players.forEach(player => {
    const rating = player.rating;
    if (!groupedPlayers[rating]) {
      groupedPlayers[rating] = [];
    }
    groupedPlayers[rating].push(player);
  });
  return groupedPlayers;
}

// Add a new shuffleArrayWithOffset function
function shuffleArrayWithOffset(array, offset) {
  // Fisher-Yates shuffle algorithm with an offset
  for (let i = 0; i < array.length - 1; i++) {
    const rangeStart = Math.max(0, i - offset);
    const rangeEnd = Math.min(array.length - 1, i + offset);
    const j =
      Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBalancedTeams(players, playersPerTeam, ratingOffset) {
  // Shuffle all players
  shuffleArrayWithOffset(players, ratingOffset);

  // Initialize an array to store teams
  const teams = Array.from(
    { length: Math.ceil(players.length / playersPerTeam) },
    () => []
  );

  // Distribute players evenly among teams
  let currentIndex = 0;
  for (let i = 0; i < playersPerTeam; i++) {
    teams.forEach(team => {
      if (currentIndex < players.length) {
        team.push(players[currentIndex].name);
        currentIndex++;
      }
    });
  }

  // Any remaining players are those who were not assigned to any team
  const remainingPlayers = players.slice(currentIndex).map(p => p.name);

  return { teams, remainingPlayers };
}

const playersPerTeam = 7;
const ratingOffset = 1; // Set the desired number of players per team

const balancedTeams = createBalancedTeams(
  playersRating,
  playersPerTeam,
  ratingOffset
);
console.log("Balanced Teams:", balancedTeams);
