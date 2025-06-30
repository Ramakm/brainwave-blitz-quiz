
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, BookOpen, ExternalLink, Search, Loader2 } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  link: string;
}

interface ReadPapersProps {
  onBack: () => void;
}

export const ReadPapers: React.FC<ReadPapersProps> = ({ onBack }) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('artificial intelligence machine learning');
  const [error, setError] = useState<string | null>(null);

  const fetchPapers = async (query: string = 'artificial intelligence machine learning') => {
    setLoading(true);
    setError(null);
    
    try {
      // Using arXiv API
      const searchQuery = encodeURIComponent(query);
      const apiUrl = `https://export.arxiv.org/api/query?search_query=all:${searchQuery}&start=0&max_results=20&sortBy=submittedDate&sortOrder=descending`;
      
      const response = await fetch(apiUrl);
      const xmlText = await response.text();
      
      // Parse XML response
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const entries = xmlDoc.getElementsByTagName('entry');
      
      const parsedPapers: Paper[] = [];
      
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const id = entry.getElementsByTagName('id')[0]?.textContent || '';
        const title = entry.getElementsByTagName('title')[0]?.textContent?.trim() || '';
        const summary = entry.getElementsByTagName('summary')[0]?.textContent?.trim() || '';
        const published = entry.getElementsByTagName('published')[0]?.textContent || '';
        
        const authorElements = entry.getElementsByTagName('author');
        const authors: string[] = [];
        for (let j = 0; j < authorElements.length; j++) {
          const name = authorElements[j].getElementsByTagName('name')[0]?.textContent;
          if (name) authors.push(name);
        }
        
        parsedPapers.push({
          id,
          title,
          authors,
          summary,
          published: new Date(published).toLocaleDateString(),
          link: id
        });
      }
      
      setPapers(parsedPapers);
    } catch (err) {
      setError('Failed to fetch papers. Please try again.');
      console.error('Error fetching papers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchPapers(searchTerm.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Quiz
          </Button>
          <h1 className="text-3xl font-bold text-white font-poppins flex items-center">
            <BookOpen className="mr-3" size={32} />
            Latest AI & ML Research Papers
          </h1>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search papers by keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
              />
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-500/20 border-red-400/30 mb-6">
            <CardContent className="p-4">
              <p className="text-red-200">{error}</p>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-white" size={48} />
            <span className="ml-4 text-white text-lg">Loading papers...</span>
          </div>
        ) : (
          <div className="grid gap-6">
            {papers.map((paper, index) => (
              <Card key={paper.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white font-poppins text-lg leading-tight">
                    {paper.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-emerald-200 text-sm">
                      👥 {paper.authors.slice(0, 3).join(', ')}
                      {paper.authors.length > 3 && ` +${paper.authors.length - 3} more`}
                    </span>
                    <span className="text-teal-200 text-sm">📅 {paper.published}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 mb-4 line-clamp-3">
                    {paper.summary.length > 300 
                      ? `${paper.summary.substring(0, 300)}...` 
                      : paper.summary
                    }
                  </p>
                  <Button
                    onClick={() => window.open(paper.link, '_blank')}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Read Paper
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {papers.length === 0 && !loading && !error && (
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="mx-auto mb-4 text-white/60" size={48} />
              <p className="text-white/80">No papers found. Try a different search term.</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Papers sourced from arXiv.org - Updated daily with the latest research
          </p>
        </div>
      </div>
    </div>
  );
};
