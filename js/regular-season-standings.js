const NBA_TEAMS = {
    Hawks: {
        color: '#E03A3E',
        id: 1610612737,
        name: '老鷹'
    },
    Celtics: {
        color: '#007A33',
        id: 1610612738,
        name: '塞爾蒂克'
    },
    Nets: {
        color: '#000000',
        id: 1610612751,
        name: '籃網'
    },
    Hornets: {
        color: '#1D1160',
        id: 1610612766,
        name: '黃蜂'
    },
    Bulls: {
        color: '#CE1141',
        id: 1610612741,
        name: '公牛'
    },
    Cavaliers: {
        color: '#860038',
        id: 1610612739,
        name: '騎士'
    },
    Mavericks: {
        color: '#00538C',
        id: 1610612742,
        name: '獨行俠'
    },
    Nuggets: {
        color: '#0E2240',
        id: 1610612743,
        name: '金塊'
    },
    Pistons: {
        color: '#C8102E',
        id: 1610612765,
        name: '活塞'
    },
    Warriors: {
        color: '#1D428A',
        id: 1610612744,
        name: '勇士'
    },
    Rockets: {
        color: '#CE1141',
        id: 1610612745,
        name: '火箭'
    },
    Pacers: {
        color: '#002D62',
        id: 1610612754,
        name: '溜馬'
    },
    Clippers: {
        color: '#C8102E',
        id: 1610612746,
        name: '快艇'
    },
    Lakers: {
        color: '#552582',
        id: 1610612747,
        name: '湖人'
    },
    Grizzlies: {
        color: '#5D76A9',
        id: 1610612763,
        name: '灰熊'
    },
    Heat: {
        color: '#98002E',
        id: 1610612748,
        name: '熱火'
    },
    Bucks: {
        color: '#00471B',
        id: 1610612749,
        name: '公鹿'
    },
    Timberwolves: {
        color: '#0C2340',
        id: 1610612750,
        name: '灰狼'
    },
    Pelicans: {
        color: '#0C2340',
        id: 1610612740,
        name: '鵜鶘'
    },
    Knicks: {
        color: '#006BB6',
        id: 1610612752,
        name: '尼克'
    },
    Thunder: {
        color: '#007AC1',
        id: 1610612760,
        name: '雷霆'
    },
    Magic: {
        color: '#0077C0',
        id: 1610612753,
        name: '魔術'
    },
    '76ers': {
        color: '#006BB6',
        id: 1610612755,
        name: '76人'
    },
    Suns: {
        color: '#1D1160',
        id: 1610612756,
        name: '太陽'
    },
    'Trail Blazers': {
        color: '#E03A3E',
        id: 1610612757,
        name: '拓荒者'
    },
    Kings: {
        color: '#5A2D81',
        id: 1610612758,
        name: '國王'
    },
    Spurs: {
        color: '#C4CED4',
        id: 1610612759,
        name: '馬刺'
    },
    Raptors: {
        color: '#CE1141',
        id: 1610612761,
        name: '暴龍'
    },
    Jazz: {
        color: '#002B5C',
        id: 1610612762,
        name: '爵士'
    },
    Wizards: {
        color: '#E31837',
        id: 1610612764,
        name: '巫師'
    }
};

function computeGB(list) {
    const leader = list[0];
    return list.map(t => ({
        ...t,
        gb: t === leader ? "--" : ((leader.wins - t.wins) + (t.losses - leader.losses)) / 2
    }));
}

function getLuminance(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(h => h + h).join('');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function idealTextColor(hex) {
    return getLuminance(hex) < 150 ? "#FFF" : "#000";
}

function getCurrentSeason() {
    const d = new Date();
    const y = d.getFullYear();
    const start = d.getMonth() + 1 >= 10 ? y : y - 1;
    return `${start}-${String(start+1).slice(-2)}`;
}

function mapTeams(headers, row) {
    const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
    return {
        conference: row[idx.Conference],
        team: row[idx.TeamName],
        wins: row[idx.WINS],
        losses: row[idx.LOSSES],
        pct: row[idx.WinPCT],
        gb: row[idx.LeagueGamesBack],
        confRec: row[idx.ConferenceRecord],
        divRec: row[idx.DivisionRecord],
        home: row[idx.HOME],
        road: row[idx.ROAD],
        neutral: row[idx.NEUTRAL],
        ot: row[idx.OT],
        last10: row[idx.L10],
        streak: row[idx.strCurrentStreak]
    };
}

function rankTeams(list) {
    return list
        .sort((a, b) => b.pct - a.pct)
        .map((t, i) => ({
            ...t,
            rank: i + 1
        }));
}

function initTable(selector, data) {
    $(selector).DataTable({
        data,
        columns: [{
                data: 'rank'
            },
            {
                data: 'team',
                render: (d) => {
                    const tinfo = NBA_TEAMS[d] || {};
                    return `
                        <img src="https://cdn.nba.com/logos/nba/${tinfo.id||''}/global/L/logo.svg" class="me-2" style="width:22px;height:22px;vertical-align:middle">
                        <span>${tinfo.name||''}</span>`;
                }
            },
            {
                data: 'wins'
            },
            {
                data: 'losses'
            },
            {
                data: 'pct'
            },
            {
                data: 'gb'
            },
            {
                data: 'confRec'
            },
            {
                data: 'divRec'
            },
            {
                data: 'home'
            },
            {
                data: 'road'
            },
            {
                data: 'neutral'
            },
            {
                data: 'ot'
            },
            {
                data: 'last10'
            },
            {
                data: 'streak',
                render: (d) => {
                    return d.replace('W', '勝').replace('L', '敗');
                }
            }
        ],
        paging: false,
        searching: false,
        info: false,
        order: [
            [0, 'asc']
        ],
        createdRow(row, data) {
            const st = NBA_TEAMS[data.teamAbbr];
            if (st) {
                const bg = st.color + "20";
                const fg = idealTextColor(st.color);
                $(row).css({
                    backgroundColor: bg,
                    color: fg,
                    fontWeight: 600
                });
                $(row).find('td:nth-child(2) span').css('color', fg);
            }
            if (data.rank <= 6) {
                $(row).addClass('table-warning').css('color', '#000');
                $(row).find('td:nth-child(2) span').css('color', '#000');
            }
            if (data.rank === 10) {
                $(row).css('border-bottom', '3px solid #fff');
            }
        }
    });
}

$(async function() {
    const season = getCurrentSeason();
    $('#season').text(season);
    const api = `https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=${season}&SeasonType=Regular%20Season&Section=overall`;
    let data;
    try {
        data = await $.ajax({
            url: api,
            method: 'GET',
            timeout: 5000
        });
    } catch {
        data = await $.getJSON('data/regular-season-standings.json');
    }

    const rs = data.resultSets[0];
    const headers = rs.headers;

    const east = rs.rowSet.filter(r => r[headers.indexOf('Conference')] === 'East').map(r => mapTeams(headers, r));
    const west = rs.rowSet.filter(r => r[headers.indexOf('Conference')] === 'West').map(r => mapTeams(headers, r));

    initTable('#east-table', rankTeams(computeGB(east)));
    initTable('#west-table', rankTeams(computeGB(west)));
});