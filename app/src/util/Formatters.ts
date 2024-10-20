const PercentFormatter = Intl.NumberFormat('en', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
});

const DistanceFormatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    style: 'unit',
    unit: 'meter',
    unitDisplay: 'narrow',
    compactDisplay: 'short',
    maximumSignificantDigits: 5,
});

const RadiansFormatter = Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
});

const VelocityFormatter = Intl.NumberFormat('en', {
    maximumFractionDigits: 1,
    notation: 'compact',
    unitDisplay: 'narrow',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
});

const MaxTwoDecimalFormatter = Intl.NumberFormat('en', {
    maximumFractionDigits: 2,
});

export {
    DistanceFormatter,
    MaxTwoDecimalFormatter,
    PercentFormatter,
    RadiansFormatter,
    VelocityFormatter,
};
