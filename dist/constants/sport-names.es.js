var RUNNING = 0;
var CYCLING_TRANSPORT = 1;
var CYCLING_SPORT = 2;
var MOUNTAIN_BIKINGS = 3;
var SKATING = 4;
var ROLLER_SKIING = 5;
var SKIING_CROSS_COUNTRY = 6;
var SKIING_DOWNHILL = 7;
var SNOWBOARDING = 8;
var KAYAKING = 9;
var KITE_SURFING = 10;
var ROWING = 11;
var SAILING = 12;
var WINDSURFING = 13;
var FINTESS_WALKING = 14;
var GOLFING = 15;
var HIKING = 16;
var ORIENTEERING = 17;
var WALKING = 18;
var RIDING = 19;
var SWIMMING = 20;
var CYCLING_INDOOR = 21;
var OTHER = 22;
var AEROBICS = 23;
var BADMINTON = 24;
var BASEBALL = 25;
var BASKETBALL = 26;
var BOXING = 27;
var CLIMBING_STAIRS = 28;
var CRICKET = 29;
var ELLIPTICAL_TRAINING = 30;
var DANCING = 31;
var FENCING = 32;
var FOOTBALL_AMERICAN = 33;
var FOOTBALL_RUGBY = 34;
var FOOTBALL_SOCCER = 35;
var HANDBALL = 36;
var HOCKEY = 37;
var PILATES = 38;
var POLO = 39;
var SCUBA_DIVING = 40;
var SQUASH = 41;
var TABLE_TENIS = 42;
var TENNIS = 43;
var VOLEYBALL_BEACH = 44;
var VOLEYBALL_INDOOR = 45;
var WEIGHT_TRAINING = 46;
var YOGA = 47;
var MARTINAL_ARTS = 48;
var GYMNASTICS = 49;
var STEP_COUNTER = 50;
var CIRKUIT_TRAINING = 87;
var RUNNING_TREADMILL = 88;
var SKATEBOARDING = 89;
var SURFING = 90;
var SNOWSHOEING = 91;
var WHEELCHAIR = 92;
var CLIMBING = 93;
var WALKING_TREADMILL = 94;
var KICK_SCOOTER = 95;
var STAND_UP_PADDLING = 96;
var TRAIL_RUNNING = 97;
var ROWING_INDOORS = 98;
var FLOORBALL = 99;
var ICE_SKATING = 100;
var SKI_TOURING = 101;
var ROPE_JUMPING = 102;
var STRETCHING = 103;
var CANICROSS = 104;
var PADDLE_TENNIS = 105;
var PARAGLIDING = 106;

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _names;

var names = (_names = {}, defineProperty(_names, RUNNING, 'Running'), defineProperty(_names, CYCLING_TRANSPORT, 'Cycling, transport'), defineProperty(_names, CYCLING_SPORT, 'Cycling, sport'), defineProperty(_names, MOUNTAIN_BIKINGS, 'Mountain biking'), defineProperty(_names, SKATING, 'Skating'), defineProperty(_names, ROLLER_SKIING, 'Roller skiing'), defineProperty(_names, SKIING_CROSS_COUNTRY, 'Skiing, cross country'), defineProperty(_names, SKIING_DOWNHILL, 'Skiing, downhill'), defineProperty(_names, SNOWBOARDING, 'Snowboarding'), defineProperty(_names, KAYAKING, 'Kayaking'), defineProperty(_names, KITE_SURFING, 'Kite surfing'), defineProperty(_names, ROWING, 'Rowing'), defineProperty(_names, SAILING, 'Sailing'), defineProperty(_names, WINDSURFING, 'Windsurfing'), defineProperty(_names, FINTESS_WALKING, 'Fitness walking'), defineProperty(_names, GOLFING, 'Golfing'), defineProperty(_names, HIKING, 'Hiking'), defineProperty(_names, ORIENTEERING, 'Orienteering'), defineProperty(_names, WALKING, 'Walking'), defineProperty(_names, RIDING, 'Riding'), defineProperty(_names, SWIMMING, 'Swimming'), defineProperty(_names, CYCLING_INDOOR, 'Cycling, Indoor'), defineProperty(_names, OTHER, 'Other'), defineProperty(_names, AEROBICS, 'Aerobics'), defineProperty(_names, BADMINTON, 'Badminton'), defineProperty(_names, BASEBALL, 'Baseball'), defineProperty(_names, BASKETBALL, 'Basketball'), defineProperty(_names, BOXING, 'Boxing'), defineProperty(_names, CLIMBING_STAIRS, 'Climbing stairs'), defineProperty(_names, CRICKET, 'Cricket'), defineProperty(_names, ELLIPTICAL_TRAINING, 'Elliptical training'), defineProperty(_names, DANCING, 'Dancing'), defineProperty(_names, FENCING, 'Fencing'), defineProperty(_names, FOOTBALL_AMERICAN, 'Football, American'), defineProperty(_names, FOOTBALL_RUGBY, 'Football, rugby'), defineProperty(_names, FOOTBALL_SOCCER, 'Football, soccer'), defineProperty(_names, HANDBALL, 'Handball'), defineProperty(_names, HOCKEY, 'Hockey'), defineProperty(_names, PILATES, 'Pilates'), defineProperty(_names, POLO, 'Polo'), defineProperty(_names, SCUBA_DIVING, 'Scuba diving'), defineProperty(_names, SQUASH, 'Squash'), defineProperty(_names, TABLE_TENIS, 'Table tennis'), defineProperty(_names, TENNIS, 'Tennis'), defineProperty(_names, VOLEYBALL_BEACH, 'Volleyball, beach'), defineProperty(_names, VOLEYBALL_INDOOR, 'Volleyball, indoor'), defineProperty(_names, WEIGHT_TRAINING, 'Weight training'), defineProperty(_names, YOGA, 'Yoga'), defineProperty(_names, MARTINAL_ARTS, 'Martial arts'), defineProperty(_names, GYMNASTICS, 'Gymnastics'), defineProperty(_names, STEP_COUNTER, 'Step counter'), defineProperty(_names, CIRKUIT_TRAINING, 'Circuit Training'), defineProperty(_names, SKATEBOARDING, 'Skateboarding'), defineProperty(_names, CLIMBING, 'Climbing'), defineProperty(_names, KICK_SCOOTER, 'Kick scooter'), defineProperty(_names, CANICROSS, 'Canicross'), defineProperty(_names, FLOORBALL, 'Floorball'), defineProperty(_names, ICE_SKATING, 'Ice skating'), defineProperty(_names, RUNNING_TREADMILL, 'Running (Treadmill)'), defineProperty(_names, SURFING, 'Surfing'), defineProperty(_names, SNOWSHOEING, 'Showshoeing'), defineProperty(_names, WHEELCHAIR, 'Wheelchair'), defineProperty(_names, WALKING_TREADMILL, 'Walking (Treadmill)'), defineProperty(_names, STAND_UP_PADDLING, 'Stand up paddling'), defineProperty(_names, TRAIL_RUNNING, 'Trail running'), defineProperty(_names, ROWING_INDOORS, 'Rowing (indoors)'), defineProperty(_names, SKI_TOURING, 'Ski touring'), defineProperty(_names, ROPE_JUMPING, 'Rope jumping'), defineProperty(_names, STRETCHING, 'Stretching'), defineProperty(_names, PADDLE_TENNIS, 'Paddle tennis'), defineProperty(_names, PARAGLIDING, 'Paragliding'), _names);

export default names;
