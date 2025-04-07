import React, { useState, useEffect } from 'react';
import { githubApi } from '../store/github/github.api';
import RepoCard from '../components/RepoCard';

function TrendingPage() {
    const [language, setLanguage] = useState<string>('javascript');
    const [timeframe, setTimeframe] = useState<string>('daily');

    const {
        isLoading,
        isError,
        data: repos,
    } = githubApi.useGetTrendingReposQuery({
        language,
        since: timeframe,
    });

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'go', label: 'Go' },
    ];

    const timeframes = [
        { value: 'daily', label: 'Today' },
        { value: 'weekly', label: 'This week' },
        { value: 'monthly', label: 'This month' },
    ];

    return (
        <div className="flex justify-center pt-10 h-full w-full">
            {isError && <p className="text-center text-red-600">Something went wrong...</p>}

            <div className="w-[760px]">
                <h1 className="text-2xl font-bold mb-4 text-center">Trending Repositories</h1>

                <div className="flex justify-between mb-6">
                    <div>
                        <label className="mr-2 font-medium">Language:</label>
                        <select
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            className="border rounded p-1"
                        >
                            {languages.map(lang => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mr-2 font-medium">Time period:</label>
                        <select
                            value={timeframe}
                            onChange={e => setTimeframe(e.target.value)}
                            className="border rounded p-1"
                        >
                            {timeframes.map(time => (
                                <option key={time.value} value={time.value}>
                                    {time.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {isLoading && <p className="text-center">Loading trending repositories...</p>}

                <div className="container">
                    {repos && repos.map(repo => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>
        </div>
    );
}

export default TrendingPage;
